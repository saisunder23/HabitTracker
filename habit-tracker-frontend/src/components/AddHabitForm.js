import React, { useState } from 'react';

const AddHabitForm = ({ onAddHabit }) => {
  const [habitName, setHabitName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (habitName.trim()) {
      onAddHabit(habitName);
      setHabitName('');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ textAlign: 'center', marginTop: '20px' }}>
      <input
        type="text"
        value={habitName}
        onChange={(e) => setHabitName(e.target.value)}
        placeholder="Enter habit name"
        style={{ padding: '8px', marginRight: '10px' }}
      />
      <button type="submit" style={{ padding: '8px' }}>Add Habit</button>
    </form>
  );
};

export default AddHabitForm;
