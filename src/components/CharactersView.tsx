import {
  Box,
  Grid,
} from "@mui/material";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getCharacters, setPage } from "../app/slices/charactersSlice";
import OneCharacter from "./OneCharacter";
import PaginationContainer from "./PaginationContainer";

const CharactersView = () => {
  const dispatch = useAppDispatch();
  const { characters, perPage, count, page } = useAppSelector((state) => state.characters);

  useEffect(() => {
    dispatch(getCharacters());
  }, [dispatch, page]);

  const handlePageChange = (newPage: number) => {
    dispatch(setPage(newPage))
  }

  return (
    <Box sx={{ mx: 3, maxHeight: "100vh" }}>
      <Grid container justifyContent="center" spacing={1}>
        {characters.map((item) => (
          <Grid
            key={item.id}
            item xs={2.8}
            sm={2.4}
            md={1.2}>
            <OneCharacter character={item} />
          </Grid>
        ))}
      </Grid>
      <PaginationContainer
        page={page}
        perPage={perPage}
        count={count}
        setPage={handlePageChange} />
    </Box>
  );
};

export default CharactersView;
