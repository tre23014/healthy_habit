document.addEventListener("DOMContentLoaded", () => {

    let username = localStorage.getItem("username");

    if (!username) {
        username = prompt("Welcome! Please enter your name:");

        while (!username || !username.trim()) {
            username = prompt("Please enter a valid name: ");
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
        }
    });
});
