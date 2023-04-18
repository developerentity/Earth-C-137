import {
  Box,
  Grid,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getCharacters, setPage, setQuery } from "../app/slices/charactersSlice";
import { useDebounce } from "../hooks/useDebounce";
import OneCharacter from "./OneCharacter";
import PaginationContainer from "./PaginationContainer";
import SearchComponent from "./SearchComponent";


const CharactersView = () => {

  const dispatch = useAppDispatch();
  const {
    characters,
    perPage,
    count,
    page,
    query
  } = useAppSelector((state) => state.charactersSlice);

  const [instantQuery, setInstantQuery] = useState<string>('')
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

  return (
    <Box sx={{ mx: 3, maxHeight: "100vh" }}>
      <SearchComponent value={instantQuery} setValue={setInstantQuery} />
      <Grid container justifyContent="center" spacing={1}>
        {characters.map((item) => (
          <Grid
            key={item.id}
            item
            xs={2.8}
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
