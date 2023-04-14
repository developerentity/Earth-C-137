import {
    Button,
    Collapse,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TableHead,
    TablePagination,
    TableRow,
    Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getLocations, setLocationsPage } from '../app/slices/locationsSlice';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { ILocation } from '../interfaces/characterInterface';


const Row = (props: { row: ILocation }) => {
    const { row } = props;
    const [open, setOpen] = useState(false);

    return (
        <>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell component="th" scope="row">{row.name}</TableCell>
                <TableCell align="right">{row.type}</TableCell>
                <TableCell align="right">{row.dimension}</TableCell>
                <TableCell align="right">
                    <Button
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {row.residents?.length} {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </Button>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Residents
                            </Typography>
                            <Table size="small" aria-label="residents of location">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Link</TableCell>
                                        {/* <TableCell>Customer</TableCell>
                                        <TableCell align="right">Amount</TableCell>
                                        <TableCell align="right">Total price ($)</TableCell> */}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.residents.map((resident) => (
                                        <TableRow key={resident}>
                                            <TableCell component="th" scope="row">
                                                {resident}
                                            </TableCell>
                                            {/* <TableCell>{historyRow.customerId}</TableCell>
                                            <TableCell align="right">{historyRow.amount}</TableCell>
                                            <TableCell align="right">
                                                {Math.round(historyRow.amount * row.price * 100) / 100}
                                            </TableCell> */}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}

const LocationsView = () => {

    const dispatch = useAppDispatch();
    const { locations, perPage, page, count, query } = useAppSelector((state) => state.locations);

    useEffect(() => {
        dispatch(getLocations());
    }, [dispatch, page, query]);

    const handlePageChange = (event: unknown, newPage: number) => {
        dispatch(setLocationsPage(newPage))
    }


    return (
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
                            <Row key={row.name} row={row} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TableFooter>
                <TablePagination
                    // rowsPerPageOptions={[10, 20, 100]}
                    component="div"
                    count={count}
                    rowsPerPage={perPage}
                    page={page}
                    onPageChange={handlePageChange}
                // onRowsPerPageChange={() => { }}
                />
            </TableFooter>
        </Paper>
    )
}

export default LocationsView;