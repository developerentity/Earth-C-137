import { Box } from '@mui/material';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getLocations, getResidentsForOneLocationById, setLocationsPage } from '../app/slices/locationsSlice';
import TableComponent from './TableComponent';

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

    const handleOnCharacters = (id: number | string) => {
        dispatch(getResidentsForOneLocationById(id))
    }

    const cells = ['name', 'type', 'dimension', 'residents']

    return (
        <Box py={2}>
            <TableComponent
                cells={cells}
                count={count}
                perPage={perPage}
                page={page}
                handlePageChange={handlePageChange}
                handleOnCharacters={handleOnCharacters}
                items={locations}
                tableAreaLabel='Locations table'
                dynamicRowsAreaLabel='Residents on location'
            />
        </Box>
    )
}

export default LocationsView;