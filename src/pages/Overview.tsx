import { Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export function Overview() {
  const navigate = useNavigate();
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
        Speed Dating Connect
      </Typography>
      <Stack
        direction="row"
        spacing={4}
        sx={{
          justifyContent: "space-between",
        }}
      >
        <Button variant="contained" onClick={() => navigate("/create")}>Create New</Button>
        <Button variant="contained" href="load">Load</Button>
      </Stack>
    </Stack>
  )
}
