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
import { getLocations, getResidentsForOneLocationById, setLocationsPage } from '../app/slices/locationsSlice';
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

    const callbackFunc = (id: number | string) => {
        dispatch(getResidentsForOneLocationById(id))
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
                                <ResidentRow
                                    key={row.name}
                                    table_cell_id={row.id}
                                    table_cell_1={row.name}
                                    table_cell_2={row.type}
                                    table_cell_3={row.dimension}
                                    table_cell_4={row.residents.length}
                                    table_cell_func={() => callbackFunc(row.id)}
                                    table_cell_data={row.residentsData}
                                />
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

export default LocationsView;