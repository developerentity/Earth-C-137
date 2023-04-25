import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TableHead,
    TablePagination,
    TableRow,
} from '@mui/material';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getLocations, setLocationsPage } from '../app/slices/locationsSlice';
import ResidentRow from './ResidentRow';


const LocationsView = () => {

    const dispatch = useAppDispatch();
    const {
        locations,
        perPage,
        page,
        count,
        query
    } = useAppSelector((state) => state.locationsSlice);

    useEffect(() => {
        dispatch(getLocations());
    }, [dispatch, page, query]);

    const handlePageChange = (event: unknown, newPage: number) => {
        dispatch(setLocationsPage(newPage))
    }

    return (
        <Box py={2}>
            <Paper>
                <TableContainer>
                    <Table aria-label="locations table" >
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell align="right">Type</TableCell>
                                <TableCell align="right">Dimension</TableCell>
                                <TableCell align="right">Residents</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {locations.map((row) => (
                                <ResidentRow key={row.name} row={row} />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TableFooter>
                    <TablePagination
                        component="div"
                        count={count}
                        rowsPerPage={perPage}
                        page={page}
                        onPageChange={handlePageChange}
                        rowsPerPageOptions={[]}
                    />
                </TableFooter>
            </Paper>
        </Box>
    )
}

export default LocationsView;