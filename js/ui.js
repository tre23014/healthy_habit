function renderHabits(username) {
    const app = document.getElementById("app");
    const habits = loadHabits();

    app.innerHTML = `
        <header>
            <h1>Healthy Habit Planner</h1>
            <p>Hello, ${username}!</p>
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

        <ul>
          ${habits.map(h => `
            <li>
                <label>
                    <input 
                        type="checkbox"
                        ${h.completed ? "checked" : ""}
                        onchange="handleToggle(${h.id})"
                    />
                    ${h.name}
                </label>
                <span>🔥 Streak: ${h.streak}</span>
                <button class="delete-btn" data-id="${h.id}" aria-label="Delete ${h.name}">🗑️ Delete</button>
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
}

function handleToggle(id) {
    toggleHabit(id);
    renderHabits();
}

function handleDelete(id) {
    deleteHabit(id);
    renderHabits();
}
