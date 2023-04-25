import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material"
import ResidentRow from "./ResidentRow"

type TProps = {
    items: Array<any>
    count: number
    perPage: number
    page: number
    handlePageChange: (event: unknown, newPage: number) => void
    handleOnCharacters: (num: number) => void
    tableAreaLabel: string
    dynamicRowsAreaLabel: string
}

const TableComponent = ({
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
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Type</TableCell>
                        <TableCell align="right">Dimension</TableCell>
                        <TableCell align="right">Residents</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {items.map((row) => (
                        <ResidentRow
                            key={row.name}
                            table_cell_id={row.id}
                            table_cell_1={row.name}
                            table_cell_2={row.type}
                            table_cell_3={row.dimension}
                            table_cell_4={row.residents.length}
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