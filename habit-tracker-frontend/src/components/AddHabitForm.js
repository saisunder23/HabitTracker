import React, { useState } from 'react';

const AddHabitForm = ({ onHabitAdded }) => {
  const [habitName, setHabitName] = useState('');
  const [goal, setGoal] = useState('');
  const [points, setPoints] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newHabit = {
      habit_name: habitName,
      description: 'A new habit to track',  // You can make this an input field later
      goal: parseInt(goal),
      point_value: parseInt(points),
    };

    try {
      const response = await fetch('http://localhost:3000/habits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newHabit),
      });

      if (response.ok) {
        const habit = await response.json();
        onHabitAdded(habit); // Update the UI
        setHabitName('');
        setGoal('');
        setPoints('');
      } else {
        console.error('Error adding habit');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
      <input
        type="text"
        placeholder="Habit Name"
        value={habitName}
        onChange={(e) => setHabitName(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Goal"
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Points"
        value={points}
        onChange={(e) => setPoints(e.target.value)}
        required
      />
      <button type="submit">Add Habit</button>
    </form>
  );
};

export default AddHabitForm;
