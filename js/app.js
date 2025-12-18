document.addEventListener("DOMContentLoaded", () => {

    let username = localStorage.getItem("username");

    if (!username) {
        username = prompt("Welcome! Please enter your name:");
        while (!username || !username.trim()) {
            username = prompt("Please enter a valid name:");
        }
        localStorage.setItem("username", username);
    }

    renderHabits(username);

    const app = document.getElementById("app");

    app.addEventListener("submit", (e) => {
        if (e.target && e.target.id === "habit-form") {
            e.preventDefault();

            const input = document.getElementById("habit-name");
            const name = input.value.trim();

            if (!name) {
                alert("Please enter a habit name.");
                input.focus();
                return;
            }

            addHabit(name);
            input.value = "";
            renderHabits(username);

            attachExportImportListeners();
        }
    });

    attachExportImportListeners();
});

function attachExportImportListeners() {
    const exportBtn = document.getElementById("export-btn");
    const importInput = document.getElementById("import-input");

    if (exportBtn) {
        exportBtn.addEventListener("click", () => {
            const habits = loadHabits();
            const blob = new Blob([JSON.stringify(habits, null, 2)], { type: "application/json" });
            const url = URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = url;
            a.download = "habits_backup.json";
            a.click();
            URL.revokeObjectURL(url);
        });
    }

    if (importInput) {
        importInput.addEventListener("change", (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const importedHabits = JSON.parse(event.target.result);
                    if (Array.isArray(importedHabits)) {
                        saveHabits(importedHabits);
                        alert("Habits imported successfully!");
                        renderHabits(localStorage.getItem("username"));
                    } else {
                        alert("Invalid file format.");
                    }
                } catch (err) {
                    alert("Error reading file: " + err);
                }
            };
            reader.readAsText(file);
        });
    }
}
