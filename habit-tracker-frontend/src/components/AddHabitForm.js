import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

const AddHabitForm = ({ onHabitAdded }) => {
  const [habitName, setHabitName] = useState('');
  const [goalPoints, setGoalPoints] = useState('');
  const [habitPointValue, setHabitPointValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!habitName || !goalPoints || !habitPointValue) {
      alert('Please fill out all fields');
      return;
    }
    onHabitAdded({
      habit_name: habitName,
      goal: parseInt(goalPoints),
      point_value: parseInt(habitPointValue),
    });
    setHabitName('');
    setGoalPoints('');
    setHabitPointValue('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
      <h2 style={{ color: 'blue' }}>Add a New Habit</h2>
      <TextField
        fullWidth
        label="Habit Name"
        value={habitName}
        onChange={(e) => setHabitName(e.target.value)}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Goal Points for Week"
        value={goalPoints}
        onChange={(e) => setGoalPoints(e.target.value)}
        margin="normal"
        type="number"
      />
      <TextField
        fullWidth
        label="Habit Point Value"
        value={habitPointValue}
        onChange={(e) => setHabitPointValue(e.target.value)}
        margin="normal"
        type="number"
      />
      <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '10px' }}>
        Add Habit
      </Button>
    </form>
  );
};

export default AddHabitForm;
