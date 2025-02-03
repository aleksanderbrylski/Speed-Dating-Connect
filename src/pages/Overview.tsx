import CalculateOutlinedIcon from '@mui/icons-material/CalculateOutlined';
import Diversity1OutlinedIcon from '@mui/icons-material/Diversity1Outlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import SummarizeOutlinedIcon from '@mui/icons-material/SummarizeOutlined';
import { Box, Stack, Typography } from "@mui/material";
import { useContext, useEffect } from "preact/hooks";
import CardCustom from '../components/Card';
import ImageWithText from "../components/ImageWithText";
import { PersonContext } from "../context/ConnectionsContext";

export function Overview() {
  const { clearPersons } = useContext(PersonContext)!;

  useEffect(() => {
    clearPersons();
  }, []);

  return (
    <Stack
      direction="column"
      spacing={4}
      sx={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ImageWithText />
      <Typography variant="h2" gutterBottom style={{ textAlign: "left" }}>
        How it works
      </Typography>
      <Box
        sx={{
          width: '100%',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(200px, 100%), 1fr))',
          gap: 2,
        }}
      >
        <CardCustom
          title="Add Participants"
          text="Add participants to the list by entering their names. You can add as many participants as you like."
          icon={<PeopleAltOutlinedIcon sx={{ fontSize: 24, fontWeight: 100 }} />}
        />
        <CardCustom
          title="Add Connections"
          text="Add connections between participants. For every participant, you can choose any other participant. Simply click button and move from left to right."
          icon={<Diversity1OutlinedIcon sx={{ fontSize: 24, fontWeight: 100 }} />}
        />
        <CardCustom
          title="Calculate Matches"
          text="Our matching algorithm will check all of the connection between participants and only return these where both participants selected each other."
          icon={<CalculateOutlinedIcon sx={{ fontSize: 24, fontWeight: 100 }} />}
        />
        <CardCustom
          title="View Matches"
          text="You can view matches for every participant and export data to a JSON file."
          icon={<SummarizeOutlinedIcon sx={{ fontSize: 24, fontWeight: 100 }} />}
        />
      </Box>
    </Stack>
  )
}
