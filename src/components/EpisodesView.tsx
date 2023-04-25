import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
} from '@mui/material';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getEpisodes, setEpisodesPage } from '../app/slices/episodesSlice';


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

    return (
        <Box py={2}>
            <Paper>
                <TableContainer>
                    <Table aria-label="episodes table" >
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell align="right">Air date</TableCell>
                                <TableCell align="right">Dimension</TableCell>
                                <TableCell align="right">Residents</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {episodes.map((row) => (
                                <Box key={row.id}>{row.name}</Box>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    component="div"
                    count={count}
                    rowsPerPage={perPage}
                    page={page}
                    onPageChange={handlePageChange}
                    rowsPerPageOptions={[]}
                />
            </Paper>
        </Box>
    )
}

export default EpisodesView;