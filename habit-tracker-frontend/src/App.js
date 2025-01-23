import React, { useState, useEffect } from 'react';
import { Container, Box, Typography } from '@mui/material';
import AddHabitForm from './components/AddHabitForm';
import HabitGrid from './components/HabitGrid';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000';

function App() {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/habits`)
      .then((response) => response.json())
      .then((data) => {
        setHabits(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching habits:', error);
        setError('Failed to fetch habits');
        setLoading(false);
      });
  }, []);

  const handleNewHabit = async (newHabit) => {
    try {
      const response = await fetch(`${API_BASE_URL}/habits`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newHabit),
      });

      if (response.ok) {
        const addedHabit = await response.json();
        setHabits((prevHabits) => [...prevHabits, addedHabit]);
      } else {
        console.error('Failed to add habit');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDeleteHabit = async (habitId) => {
    if (!habitId) {
      console.error('Invalid habit ID');
      return;
    }

    const confirmDelete = window.confirm("Are you sure you want to delete this habit?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`${API_BASE_URL}/habits/${habitId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setHabits((prevHabits) => prevHabits.filter((habit) => habit.habit_id !== habitId));
        console.log('Habit deleted successfully');
      } else {
        console.error('Failed to delete habit');
      }
    } catch (error) {
      console.error('Error deleting habit:', error);
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ textAlign: 'center', mt: 5 }}>
        <Typography variant="h2" gutterBottom>
          Habit Tracker
        </Typography>

        {loading && <Typography>Loading habits...</Typography>}
        {error && <Typography color="error">{error}</Typography>}

        <Box sx={{ mt: 4 }}>
          {!loading && <HabitGrid habits={habits} onDeleteHabit={handleDeleteHabit} />}
        </Box>

        <Box sx={{ mt: 5 }}>
          <AddHabitForm onHabitAdded={handleNewHabit} />
        </Box>
      </Box>
    </Container>
  );
}

export default App;
