import { Box, Pagination } from '@mui/material';

interface IPaginationContainerProps {
  page: number;
  count: number;
  perPage: number;
  setPage: (value: number) => any;
}

const PaginationContainer = ({
  page,
  count,
  perPage,
  setPage
}: IPaginationContainerProps) =>
  count && count > perPage ? (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: '20px'
      }}>
      <Pagination
        count={Math.floor(count / perPage + 1)}
        page={page}
        shape="rounded"
        onChange={(el, value: number) => {
          setPage(value);
        }}
      />
    </Box>
  ) : null;

export default PaginationContainer;
