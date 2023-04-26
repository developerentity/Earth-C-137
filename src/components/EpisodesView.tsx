import { Box } from '@mui/material';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getEpisodes, setEpisodesPage } from '../app/slices/episodesSlice';
import TableComponent from './TableComponent';

const EpisodesView = () => {

    const dispatch = useAppDispatch();
    const {
        episodes,
        perPage,
        page,
        count,
        query
    } = useAppSelector((state) => state.episodesSlice);

    useEffect(() => {
        dispatch(getEpisodes());
    }, [dispatch, page, query]);

    const handlePageChange = (event: unknown, newPage: number) => {
        dispatch(setEpisodesPage(newPage))
    }

    const cells = ['name', 'air_date', 'episode',]

    return (
        <Box py={2}>
            <TableComponent
                cells={cells}
                count={count}
                perPage={perPage}
                page={page}
                handlePageChange={handlePageChange}
                handleOnCharacters={() => {}}
                items={episodes}
                tableAreaLabel='Locations table'
                dynamicRowsAreaLabel='Residents on location'
            />
        </Box>
    )
}

export default EpisodesView;