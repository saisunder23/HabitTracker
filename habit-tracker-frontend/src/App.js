import React, { useState, useEffect } from 'react';
import AddHabitForm from './components/AddHabitForm';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;  // Use environment variable

function App() {
  const [habits, setHabits] = useState([]);

  // Fetch habits from the backend
  useEffect(() => {
    fetch(`${API_BASE_URL}/habits`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch habits');
        }
        return response.json();
      })
      .then((data) => setHabits(data))
      .catch((error) => console.error('Error fetching habits:', error));
  }, []);

  // Function to handle adding a new habit
  const handleNewHabit = async (newHabit) => {
    try {
      const response = await fetch(`${API_BASE_URL}/habits`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newHabit),
      });

      if (!response.ok) {
        throw new Error('Failed to add habit');
      }

      const savedHabit = await response.json();
      setHabits([...habits, savedHabit]);  // Update the state with the new habit
    } catch (error) {
      console.error('Error adding habit:', error);
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Habit Tracker</h1>
      <ul>
        {habits.map((habit) => (
          <li key={habit.habit_id}>
            {habit.habit_name} - Goal: {habit.goal} - Points: {habit.point_value}
          </li>
        ))}
      </ul>
      <AddHabitForm onHabitAdded={handleNewHabit} />
    </div>
  );
}

export default App;
