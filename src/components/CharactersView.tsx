import {
  Box,
  Grid,
  TextField,
} from "@mui/material";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getCharacters } from "../app/slices/charactersSlice";
import OneCharacter from "./OneCharacter";

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
      <Grid container justifyContent="center" spacing={1}>
        {characters.map((item) => (
          <Grid key={item.id} item xs={2.8} sm={2.4} md={1.2}>
            <OneCharacter character={item} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CharactersView;
