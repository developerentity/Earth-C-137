import {
  Box,
  Grid,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getCharacters, setPage, setQuery } from "../app/slices/charactersSlice";
import { useDebounce } from "../hooks/useDebounce";
import OneCharacter from "./OneCharacter";
import PaginationContainer from "./PaginationContainer";

const CharactersView = () => {

  const dispatch = useAppDispatch();
  const { characters, perPage, count, page, query } = useAppSelector((state) => state.characters);

  const [instantQuery, setInstantQuery] = useState<string>()
  const delay = 500;
  const debouncedQuery = useDebounce(instantQuery, delay)

  useEffect(() => {
    dispatch(setQuery(debouncedQuery))
    dispatch(setPage(1))
  }, [dispatch, debouncedQuery])

  useEffect(() => {
    dispatch(getCharacters());
  }, [dispatch, page, query]);

  const handlePageChange = (newPage: number) => {
    dispatch(setPage(newPage))
  }

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInstantQuery(event.target.value)
  }

  return (
    <Box sx={{ mx: 3, maxHeight: "100vh" }}>
      <TextField onChange={handleQueryChange} id="outlined-basic" label="Outlined" variant="outlined" />
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
