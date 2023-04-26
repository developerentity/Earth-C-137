import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material"
import ResidentRow from "./ResidentRow"
import { ILocation } from "../interfaces/locationInterface"

type TProps = {
    cells: Array<string>
    items: Array<ILocation>
    count: number
    perPage: number
    page: number
    handlePageChange: (event: unknown, newPage: number) => void
    handleOnCharacters: (num: number) => void
    tableAreaLabel: string
    dynamicRowsAreaLabel: string
}

const TableComponent = ({
    cells,
    items,
    count,
    perPage,
    page,
    handlePageChange,
    handleOnCharacters,
    tableAreaLabel,
    dynamicRowsAreaLabel,
}: TProps) => {

    return <Paper>
        <TableContainer>
            <Table aria-label={tableAreaLabel} >
                <TableHead>
                    <TableRow>
                        {cells.map((item, index) =>
                            <TableCell
                                key={item}
                                align={index > 0 ? 'right' : 'left'}
                                sx={{ '::first-letter': { 'textTransform': 'uppercase' } }}>
                                {item.replace(/_/g, ' ')}
                            </TableCell>
                        )}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {items.map((row) => (
                        <ResidentRow
                            key={row.id}
                            cells={cells}
                            row={row}

                            table_cell_func={() => handleOnCharacters(row.id)}
                            table_cell_data={row.residentsData}
                            aria_label={dynamicRowsAreaLabel}
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
}

export default TableComponent