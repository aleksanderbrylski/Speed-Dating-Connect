import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, IconButton, List, ListItem, ListItemText, Stack, TextField, Typography } from "@mui/material";
import { useState } from "preact/hooks";
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { PersonContext } from '../context/ConnectionsContext';

export function AddPersons() {
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
        justifyContent: "flex-start",
        alignItems: "flex-start",
      }}
    >
      <Typography variant="h1" gutterBottom>
        Manage Participants
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline', columnGap: '20px' }}>
        <TextField
          label="Add Person"
          variant="outlined"
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
          size='large'
          variant="contained"
          color="primary"
          onClick={handleAddItem}
          style={{ marginTop: '10px', marginBottom: '20px' }}
        >
          Add
        </Button>

      </Box>
      <List sx={{ width: '500px' }}>
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
          fullWidth>
          Add connections
        </Button>
      )}
    </Stack>
  );
}

