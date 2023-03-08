import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Pagination,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import { useEffect, useState } from "react";

const CharactersView = () => {
  const [info, setInfo] = useState({});
  const [items, setItems] = useState([]);

  const getData = async () => {
    const res = await fetch("https://rickandmortyapi.com/api/character");
    const data = await res.json();
    setInfo(data.info);
    setItems(data.results);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    console.log(info);
    console.log(items);
  }, [info, items]);

  return (
    <Box sx={{ mx: 3, maxHeight: "100vh" }}>
      <Box
        component="form"
        sx={{
          display: "flex",
          justifyContent: "center",
          my: 1,
          "& .MuiTextField-root": { m: 1, maxWidth: "50ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            color="secondary"
            id="outlined-multiline-flexible"
            label="Search character"
            multiline
            maxRows={4}
          />
        </div>
      </Box>
      <Grid container justifyContent="center" spacing={2}>
        {items.map((item) => (
          <Grid key={item.id} item xs={1}>
            <Card sx={{ height: "100%" }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  image={item.image}
                  alt={`${item.name} avatar`}
                />
                <CardContent>{item.name}</CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          my: 2,
        }}
      >
        <Stack spacing={2}>
          <Pagination count={10} shape="rounded" color="secondary" />
        </Stack>
      </Box>
    </Box>
  );
};

export default CharactersView;
