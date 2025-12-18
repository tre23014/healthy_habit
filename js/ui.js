function renderHabits(username) {
    const app = document.getElementById("app");
    const habits = loadHabits();
    const completed = habits.filter(h => h.completed).length;
    const total = habits.length;
    const percent = total ? Math.round((completed / total) * 100) : 0;

    app.innerHTML = `
        <header>
            <h1>Hello, ${username}!</h1>
            <bloackquote id="quote" aria-live="polite">
                Loading inspirational quote...
            </blockquote>
        </header>

        <form id="habit-form" novalidate>
            <label for="habit-name">New Habit</label>
            <input 
                id="habit-name"
                required 
                aria-required="true"
                placeholder="e.g. Morning Walk"
            />
            <button>Add Habit</button>
        </form>

        <div id="backup-controls">
            <button id="export-btn">Save/Download Habits</button>
            <input type="file" id="import-input" accept=".json" />
        </div>

        <div class="progress-card">
            <p>Today's Progress</p>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${percent}%"></div>
            </div>
            <small>${completed} / ${total} habits completed (${percent}%)</small>
        </div>


        <ul class="habit-list">
        ${habits.map(h => `
            <li class="habit-card">
                <div>
                    <strong>${h.name}</strong>
                    <div>🔥 Streak: ${h.streak}</div>
                </div>

                <div class="habit-actions">
                    <input type="checkbox"
                        ${h.completed ? "checked" : ""}
                        onchange="handleToggle(${h.id})" />
                    <button class="delete-btn" data-id="${h.id}">🗑️</button>
                </div>
            </li>
        `).join("")}
        </ul>

    `;

    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = Number(btn.dataset.id);
            handleDelete(id, username);
        });
    });
    loadMotivationalQuote();
}

function handleToggle(id) {
    toggleHabit(id);
    renderHabits();
}

function handleDelete(id) {
    deleteHabit(id);
    renderHabits();
}

function openHabitDetail(habitId) {
    const habits = loadHabits();
    const habit = habits.find(h => h.id === habitId);
    if (!habit) return;

    const modal = document.createElement("div");
    modal.id = "habit-detail-modal";
    modal.innerHTML = `
        <div class="modal-content">
            <h2>${habit.name}</h2>
            <p>Streak: ${habit.streak}</p>
            <p>Created at: ${habit.createdAt || "N/A"}</p>
            <button id="edit-habit-btn">Edit</button>
            <button id="delete-habit-btn">Delete</button>
            <button id="close-habit-btn">Close</button>
        </div>
    `;
    document.body.appendChild(modal);

    document.getElementById("close-habit-btn").addEventListener("click", () => {
        modal.remove();
    });

    document.getElementById("delete-habit-btn").addEventListener("click", () => {
        deleteHabit(habitId);
        renderHabits(localStorage.getItem("username"));
        modal.remove();
    });
}

function showToast(message) {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;

    document.body.appendChild(toast);

    setTimeout(() => toast.remove(), 2500);
}

function loadMotivationalQuote() {
    fetch("https://zenquotes.io/api/random")
        .then(res => res.json())
        .then(data => {
            const quoteEl = document.getElementById("quote");
            if (!quoteEl) return;

            const quote = data[0].q;
            const author = data[0].a;

            quoteEl.textContent = `"${quote}" — ${author}`;
        })
        .catch(() => {
            const quoteEl = document.getElementById("quote");
            if (quoteEl) {
                quoteEl.textContent = "Stay consistent. Small habits add up.";
            }
        });
}
