import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  Typography,
  Box,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const daysOfWeek = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

const HabitGrid = ({ habits, onDeleteHabit }) => {
  const [completed, setCompleted] = useState(
    habits.map(() => Array(7).fill(false))
  );

  const handleCheckboxChange = (habitIndex, dayIndex) => {
    const updatedCompleted = [...completed];
    updatedCompleted[habitIndex][dayIndex] = !updatedCompleted[habitIndex][dayIndex];
    setCompleted(updatedCompleted);
  };

  const calculatePoints = (habitIndex) => {
    return completed[habitIndex].reduce(
      (total, isCompleted) => total + (isCompleted ? habits[habitIndex].point_value : 0),
      0
    );
  };

  return (
    <Box sx={{ mt: 4 }}>
      <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                Habits
              </TableCell>
              {daysOfWeek.map((day, index) => (
                <TableCell key={index} align="center" sx={{ fontWeight: 'bold' }}>
                  {day}
                </TableCell>
              ))}
              <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                Total Points
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {habits.map((habit, habitIndex) => (
              <TableRow key={habit.habit_id} sx={{ bgcolor: habitIndex % 2 === 0 ? '#f9f9f9' : '#ffffff' }}>
                <TableCell align="center" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                  {habit.habit_name}
                </TableCell>
                {Array.from({ length: 7 }).map((_, dayIndex) => (
                  <TableCell key={dayIndex} align="center">
                    <Checkbox
                      checked={completed[habitIndex][dayIndex]}
                      onChange={() => handleCheckboxChange(habitIndex, dayIndex)}
                      color="primary"
                    />
                  </TableCell>
                ))}
                <TableCell align="center">
                  <Typography variant="h6" color={calculatePoints(habitIndex) > habit.goal ? 'success.main' : 'error.main'}>
                    {calculatePoints(habitIndex)}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    onClick={() => onDeleteHabit(habit.habit_id)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default HabitGrid;
