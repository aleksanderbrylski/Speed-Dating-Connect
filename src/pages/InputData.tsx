import DeleteIcon from '@mui/icons-material/Delete';
import { Button, IconButton, List, ListItem, ListItemText, Stack, TextField, Typography } from "@mui/material";
import { useState } from "preact/hooks";
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { PersonContext } from '../context/ConnectionsContext';

export function InputData() {
  const { persons, addPerson, deletePerson } = useContext(PersonContext)!;
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');

  const handleAddItem = () => {
    if (inputValue.trim() !== '') {
      addPerson(inputValue);
      setInputValue('');
    }
  };

  return (
    <Stack
      direction="column"
      spacing={4}
      sx={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h2" gutterBottom>
        Add Persons
      </Typography>
      <TextField
        label="Add Person"
        variant="outlined"
        fullWidth
        value={inputValue}
        onChange={(e) => {
          if (e.target) {
            setInputValue((e.target as HTMLInputElement).value);
          }
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleAddItem();
          }
        }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddItem}
        style={{ marginTop: '10px', marginBottom: '20px' }}
        fullWidth
      >
        Add
      </Button>
      <List sx={{ width: '100%' }}>
        {persons.map((item, index) => (
          <ListItem
            key={index}
            disableGutters
            secondaryAction={
              <IconButton edge="end" aria-label="delete" onClick={() => deletePerson(item.id)} color='primary'>
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemText
              primary={`${index + 1}. ${item.name}`}
            />
          </ListItem>
        ))}
      </List>
      {persons.length > 0 && (
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/edit")}
          style={{ marginTop: '30px' }}
          fullWidth
        >
          Next
        </Button>
      )}
    </Stack>
  );
}

