import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  TextField,
} from "@mui/material";
import { Stack } from "@mui/system";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getCharacters } from "../app/slices/charactersSlice";
import PaginationContainer from "./PaginationContainer";

const CharactersView = () => {
  const dispatch = useAppDispatch();
  const { characters } = useAppSelector((state) => state.characters);

  useEffect(() => {
    dispatch(getCharacters());
  }, [dispatch]);

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
        {characters.map((item) => (
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
          <PaginationContainer
            page={1}
            count={834}
            perPage={20}
            setPage={() => {}}
          />
        </Stack>
      </Box>
    </Box>
  );
};

export default CharactersView;
