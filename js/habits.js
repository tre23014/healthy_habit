function addHabit(name) {
    if (!name || !name.trim()) {
        return;
    }

    const habits = loadHabits();
    habits.push({
        id: Date.now(),
        name,
        completed: false,
        streak: 0,
        createdAt: new Date().toISOString()
    });
    saveHabits(habits);
}

function toggleHabit(id) {
    const habits = loadHabits();
    const habit = habits.find(habit => habit.id === id);

    if (habit) {
        if (typeof habit.streak !== 'number') {
            habit.streak = 0;
        }

        habit.completed = !habit.completed;

        if (habit.completed) {
            habit.streak += 1;
        }
        else {
            habit.streak = Math.max(0, habit.streak - 1);
        }

        saveHabits(habits);
    }
}

function deleteHabit(id) {
    const habits = loadHabits().filter(h => h.id !== id);
    saveHabits(habits);
}