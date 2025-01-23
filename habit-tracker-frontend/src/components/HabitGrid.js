import React, { useState } from 'react';

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const HabitGrid = ({ habits, onCheck }) => {
  return (
    <table style={{ margin: '20px auto', borderCollapse: 'collapse', width: '80%' }}>
      <thead>
        <tr>
          <th style={{ border: '1px solid black', padding: '8px' }}>Habit</th>
          {daysOfWeek.map((day) => (
            <th key={day} style={{ border: '1px solid black', padding: '8px' }}>{day}</th>
          ))}
          <th style={{ border: '1px solid black', padding: '8px' }}>Points</th>
        </tr>
      </thead>
      <tbody>
        {habits.map((habit, index) => (
          <tr key={index}>
            <td style={{ border: '1px solid black', padding: '8px' }}>{habit.name}</td>
            {daysOfWeek.map((_, dayIndex) => (
              <td key={dayIndex} style={{ border: '1px solid black', padding: '8px' }}>
                <input type="checkbox" onChange={() => onCheck(index)} />
              </td>
            ))}
            <td style={{ border: '1px solid black', padding: '8px' }}>{habit.points}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default HabitGrid;
