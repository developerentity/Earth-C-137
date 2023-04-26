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
    cells: Array<string>
    row: any
    table_cell_func?: () => void
    table_cell_data: Array<ICharacter> | null
    aria_label?: string
}

const ResidentRow = (props: TProps) => {

    const {
        cells,
        row,
        table_cell_func,
        table_cell_data,
        aria_label,
    } = props;
    const [open, setOpen] = useState(false);

    const onShowCharactersHandle = () => {
        table_cell_func && table_cell_func()
        setOpen(!open)
    }

    return (
        <>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                {cells.map((key, index) => <TableCell
                    key={key}
                    component={index === 0 ? 'th' : undefined}
                    scope={index === 0 ? 'row' : undefined}
                    align={index !== 0 ? 'right' : undefined}
                >
                    {
                        typeof row[key] === "object"
                            ? <Button
                                aria-label="expand row"
                                size="small"
                                disabled={row[key].length === 0}
                                onClick={onShowCharactersHandle}
                            >
                                {row[key].length} {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                            </Button>
                            : <>{row[key]}</>
                    }
                </TableCell>
                )}
            </TableRow>

            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Residents
                            </Typography>
                            <Table size="small" aria-label={aria_label}>
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