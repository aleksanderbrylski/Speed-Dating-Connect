import { Button, Checkbox, Grid, List, ListItemButton, ListItemIcon, ListItemText, Pagination, Paper, Stack, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "preact/hooks";
import { useNavigate } from "react-router-dom";
import { Person, PersonContext } from "../context/ConnectionsContext";

function not(a: Person[], b: Person[]) {
  return a.filter((value) => !b.includes(value));
}

function intersection(a: Person[], b: Person[]) {
  return a.filter((value) => b.includes(value));
}


export function CreateNewConnections() {
  const [page, setPage] = useState(1);
  const { persons, addLikedPersons } = useContext(PersonContext)!;

  const navigate = useNavigate();
  const person = persons[page - 1]

  const [checked, setChecked] = useState<Person[]>([]);
  const [left, setLeft] = useState<Person[]>([]);
  const [right, setRight] = useState<Person[]>([]);


  useEffect(() => {
    setLeft(persons.filter(i => i.id !== persons[page - 1].id && !persons[page - 1].likedPersons.find(sub => sub.id === i.id)))
    setRight(persons[page - 1].likedPersons)
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



  const customList = (items: Person[]) => (
    <Paper sx={{ width: 200, height: 230, overflow: 'auto', background: "#4a4a4a" }} variant="elevation">
      <List dense component="div" role="list">
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
        <Grid container spacing={4} direction="row">
          <Grid item>{customList(left)}
          </Grid>
          <Grid item>
            <Grid container direction="column" sx={{ alignItems: 'center', justifyContent: 'center' }}>
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
            <Grid item>{customList(right)}

            </Grid>
          </Grid>
        </Grid>
      </div>
      <Pagination count={persons.length} color="secondary" page={page} onChange={handleChange} />
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
