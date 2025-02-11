import { Box, Button, Checkbox, Grid, List, ListItemButton, ListItemIcon, ListItemText, Pagination, Paper, Stack, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";
import { debounce } from 'lodash';
import { useContext, useEffect, useMemo, useState } from "preact/hooks";
import { useNavigate } from "react-router-dom";
import { Person, PersonContext } from "../context/ConnectionsContext";

function not(a: Person[], b: Person[]) {
  return a.filter((value) => !b.includes(value));
}

function intersection(a: Person[], b: Person[]) {
  return a.filter((value) => b.includes(value));
}

export function AddConnections() {
  const [page, setPage] = useState(1);
  const { persons, addLikedPersons } = useContext(PersonContext)!;
  const navigate = useNavigate();

  if (persons.length === 0) {
    window.location.href = "/"
  }

  const person = persons[page - 1]

  const [checked, setChecked] = useState<Person[]>([]);
  const [left, setLeft] = useState<Person[]>([]);
  const [right, setRight] = useState<Person[]>([]);

  useEffect(() => {
    setLeft(persons.filter(i => i.id !== persons[page - 1].id && !persons[page - 1].likedPersons.find(sub => sub.id === i.id)))
    setRight(persons[page - 1].likedPersons)
    setChecked([])
  }, [page])

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value: Person) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleAllRight = () => {
    setRight(right.concat(left));
    setLeft([]);
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleAllLeft = () => {
    setLeft(left.concat(right));
    setRight([]);
  };

  const [filterText, setFilterText] = useState('');

  const debouncedSetFilterText = useMemo(
    () => debounce((text: string) => setFilterText(text), 300
    ), []);

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target) {
      debouncedSetFilterText((event.target as HTMLInputElement).value);
    }
  };

  const filteredLeft = left.filter(item =>
    item.name.toLowerCase().includes(filterText.toLowerCase())
  );

  const customList = (items: Person[], left?: boolean) => (
    <Paper sx={{ width: 200, height: 230, overflow: 'auto', background: "#FCF7FA" }} variant="elevation">
      <List dense component="div" role="list">
        {left &&
          <TextField
            id="filter"
            label="Search..."
            variant="outlined"
            size="small"
            value={filterText}
            onChange={handleFilterChange}
          />
        }
        {items.map((value: Person) => {
          const labelId = `transfer-list-item-${value}-label`;
          return (
            <ListItemButton
              key={value}
              role="listitem"
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.includes(value)}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    'aria-labelledby': labelId,
                  }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={value.name} />
            </ListItemButton>
          );
        })}
      </List>
    </Paper>
  );

  const handleChange = (_event: any, value: number) => {
    addLikedPersons(persons[page - 1].id, right)
    setPage(value);
  };

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Stack
      direction="column"
      spacing={4}
      sx={{
        justifyContent: "center",
        alignPersons: "center",
      }}
    >
      <div key={person.id}>
        <Typography variant="h3" gutterBottom>
          {person.name}
        </Typography>
        <Grid container spacing={4} direction={isSmallScreen ? 'column' : 'row'} justifyContent="center" alignItems="center">
          <Grid item>
            <Typography variant="body2" gutterBottom>
              All persons
            </Typography>
            {customList(filteredLeft, true)}
          </Grid>
          <Grid item sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Grid container direction={isSmallScreen ? 'row' : 'column'} sx={{ alignItems: 'center', justifyContent: 'center' }}>
              <Button
                sx={{ my: 0.5 }}
                variant="outlined"
                size="small"
                onClick={handleAllRight}
                disabled={left.length === 0}
                aria-label="move all right"
              >
                ≫
              </Button>
              <Button
                sx={{ my: 0.5 }}
                variant="outlined"
                size="small"
                onClick={handleCheckedRight}
                disabled={leftChecked.length === 0}
                aria-label="move selected right"
              >
                &gt;
              </Button>
              <Button
                sx={{ my: 0.5 }}
                variant="outlined"
                size="small"
                onClick={handleCheckedLeft}
                disabled={rightChecked.length === 0}
                aria-label="move selected left"
              >
                &lt;
              </Button>
              <Button
                sx={{ my: 0.5 }}
                variant="outlined"
                size="small"
                onClick={handleAllLeft}
                disabled={right.length === 0}
                aria-label="move all left"
              >
                ≪
              </Button>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="body2" gutterBottom>
              Liked persons
            </Typography>
            <Grid item>
              {customList(right)}
            </Grid>
          </Grid>
        </Grid>
      </div>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Pagination
          count={persons.length}
          color="primary"
          page={page}
          onChange={handleChange}
          variant="outlined"
          size={isSmallScreen ? 'medium' : 'large'}
        />
      </Box>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          addLikedPersons(persons[page - 1].id, right)
          navigate("/calculate")
        }}
        style={{ marginTop: '30px' }}
        fullWidth
      >
        Calculate matches
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/create")}
        style={{ marginTop: '30px' }}
        fullWidth
      >
        Back
      </Button>
    </Stack>
  );
}
