import { Button, List, ListItem, ListItemText, Pagination, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useContext, useEffect, useState } from "preact/hooks";
import { useNavigate } from "react-router-dom";
import { Person, PersonContext } from "../context/ConnectionsContext";

function findAllDoubleConnectedPersons(nodes: Person[]): Record<string, string[]> {
  let doubleConnectedMap: Record<string, string[]> = {};

  // Iterate through each node
  for (let node of nodes) {
    doubleConnectedMap[node.id] = [];

    // Iterate through the connections of the current node
    for (let connectedNode of node.likedPersons) {
      // Check if the connected node also has the current node in its connections
      if (connectedNode.likedPersons.some(n => n.id === node.id)) {
        // Add the connected node to the list if it's double connected
        doubleConnectedMap[node.id].push(connectedNode.id);
        doubleConnectedMap[connectedNode.id].push(node.id);
      }
    }
  }

  return doubleConnectedMap;
}

export function CalculateConnections() {
  const [page, setPage] = useState(1);
  const { persons } = useContext(PersonContext)!;
  const [matches, setMatches] = useState<Record<string, string[]>>({});

  const navigate = useNavigate();
  const person = persons[page - 1]


  const handleChange = (_event: any, value: number) => {
    setPage(value);
  };

  const handleExportClick = () => {
    const result = findAllDoubleConnectedPersons(persons);
    const resultHuminized = Object.keys(result).map((key) => {
      return {
        name: persons.find(p => p.id === key)?.name,
        matches: result[key].map(id => persons.find(p => p.id === id)?.name)
      }
    })
    const element = document.createElement("a");
    const file = new Blob([JSON.stringify(resultHuminized)], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "matches.json";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  }

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const result = findAllDoubleConnectedPersons(persons);
    setMatches(result);
  }, [])

  if (Object.keys(matches).length === 0) {
    return (
      <Typography variant="h2" gutterBottom>
        No matches ;/
      </Typography>
    )
  }

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
        Matches for {person.name}
      </Typography>
      <List sx={{
        width: '500px',
        '@media (max-width:600px)': {
          width: '75vw',
        },
      }}>
        {matches[person.id].map((id) => persons.find(p => p.id === id)?.name).map((item, index) => (
          <ListItem
            key={index}
            disableGutters
          >
            <ListItemText
              primary={`${index + 1}. ${item}`}
            />
          </ListItem>
        ))}
      </List>
      <Pagination
        count={persons.length}
        color="primary"
        page={page}
        onChange={handleChange}
        variant="outlined"
        size={isSmallScreen ? 'medium' : 'large'}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleExportClick()}
        style={{ marginTop: '30px' }}
        fullWidth
      >
        Export result
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/edit")}
        style={{ marginTop: '30px' }}
        fullWidth
      >
        Back
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/")}
        style={{ marginTop: '30px' }}
        fullWidth
      >
        Start over
      </Button>
    </Stack>
  )
}
