const STORAGE_KEY = "healthyHabits";

function loadHabits() {
    const data = localStorage.getItem(STORAGE_KEY);
    const habits = data ? JSON.parse(data) : [];

    habits.forEach(h => {
        if (typeof h.streak !== "number") {
            h.streak = 0;
        }
    });

    return habits;
}


function saveHabits(habits) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
}