import React, { useState, useEffect } from 'react';
import HabitGrid from './components/HabitGrid';
import AddHabitForm from './components/AddHabitForm';
import Auth from './components/Auth';
import './components/App.css';

function App() {
  const [habits, setHabits] = useState([]);
  const [user, setUser] = useState(null);
  const API_URL = 'http://localhost:3000';

  // Check if the user is logged in on page load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      fetchHabits();
    }
  }, []);

  // Fetch habits from backend
  const fetchHabits = async () => {
    try {
      const response = await fetch(`${API_URL}/habits`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setHabits(data);
      } else {
        console.error('Failed to fetch habits');
      }
    } catch (error) {
      console.error('Error fetching habits:', error);
    }
  };

  // Handle adding a new habit
  const handleAddHabit = async (habitName) => {
    try {
      const response = await fetch(`${API_URL}/habits`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ name: habitName, points: 0 }),
      });

      if (response.ok) {
        const newHabit = await response.json();
        setHabits([...habits, newHabit]);
      } else {
        console.error('Failed to add habit');
      }
    } catch (error) {
      console.error('Error adding habit:', error);
    }
  };

  // Handle checking off a habit
  const handleCheck = async (index) => {
    const updatedHabits = [...habits];
    updatedHabits[index].points += 1;
    setHabits(updatedHabits);

    try {
      await fetch(`${API_URL}/habits/${habits[index].id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ points: updatedHabits[index].points }),
      });
    } catch (error) {
      console.error('Error updating habit:', error);
    }
  };

  // Handle user login and registration
  const handleAuthSuccess = (userData, token) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', token);
    fetchHabits();
  };

  // Handle logout
  const handleLogout = () => {
    setUser(null);
    setHabits([]);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px', fontFamily: 'Arial' }}>
      <h1>Simple Habit Tracker</h1>
      {!user ? (
        <Auth onAuthSuccess={handleAuthSuccess} />
      ) : (
        <>
          <button onClick={handleLogout} style={{ marginBottom: '20px' }}>
            Logout
          </button>
          <AddHabitForm onAddHabit={handleAddHabit} />
          <HabitGrid habits={habits} onCheck={handleCheck} />
        </>
      )}
    </div>
  );
}

export default App;
