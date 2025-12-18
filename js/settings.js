document.addEventListener("DOMContentLoaded", () => {

    document.getElementById("settings-btn").addEventListener("click", () => {
        document.getElementById("settings-modal").classList.remove("hidden");
    });

    document.getElementById("close-settings-btn").addEventListener("click", () => {
        document.getElementById("settings-modal").classList.add("hidden");
    });

    const themeToggle = document.getElementById("theme-toggle");
    themeToggle.checked = localStorage.getItem("theme") === "dark";
    themeToggle.addEventListener("change", (e) => {
        document.body.classList.toggle("dark-mode", e.target.checked);
        localStorage.setItem("theme", e.target.checked ? "dark" : "light");
    });

    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
    }
});
