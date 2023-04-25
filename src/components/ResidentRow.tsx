import {
    Box,
    Button,
    Collapse,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { ICharacter } from '../interfaces/characterInterface';

type TProps = {
    table_cell_id: string | number
    table_cell_1: string
    table_cell_2?: string
    table_cell_3?: string
    table_cell_4?: number
    table_cell_func?: () => void
    table_cell_data: Array<ICharacter> | null
}

const ResidentRow = (props: TProps) => {

    const {
        table_cell_1,
        table_cell_2,
        table_cell_3,
        table_cell_4,
        table_cell_func,
        table_cell_data
    } = props;
    const [open, setOpen] = useState(false);

    const onShowCharactersHandle = () => {
        table_cell_func && table_cell_func()
        setOpen(!open)
    }

    return (
        <>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell component="th" scope="row">{table_cell_1}</TableCell>
                {table_cell_2 ? <TableCell align="right">{table_cell_2}</TableCell> : null}
                {table_cell_3 ? <TableCell align="right">{table_cell_3}</TableCell> : null}
                {table_cell_4 ? <TableCell align="right">
                    <Button
                        aria-label="expand row"
                        size="small"
                        onClick={onShowCharactersHandle}
                    >
                        {table_cell_4} {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </Button>
                </TableCell> : null}
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
                                        {/* <TableCell>Customer</TableCell>
                                        <TableCell align="right">Amount</TableCell>
                                        <TableCell align="right">Total price ($)</TableCell> */}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {table_cell_data?.map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell component="th" scope="row">
                                                {item.name}
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

export default ResidentRow;