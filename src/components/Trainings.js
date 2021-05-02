import React, { useEffect, useState } from 'react';
import { Snackbar, TablePagination, Table, TableContainer, Paper } from '@material-ui/core';
import trainingService from './services/trainingService';
import TrainingHeader from './trainings/TrainingHeader';
import TrainingBody from './trainings/TrainingBody';
import SearchTraining from './trainings/SearchTraining';

function Trainings() {
  const [trainings, setTrainings] = useState([]);

  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState('');

  //for pagination
  const pages = [5, 10];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pages[page]);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, trainings.length - page * rowsPerPage);

  //for filtering
  const [filter, setFilter] = useState({ fn: items => { return items } })

  useEffect(() => getTrainings(), [])

  //getting trainings
  const getTrainings = () => {
    trainingService
      .getTrainings()
      .then(data => {
        setTrainings(data)
      })
      .catch(err => console.error(err))
  };

  //deleting trainings
  const handleDelete = training => {
    trainingService
      .deleteTraining(training)
      .then(_ => getTrainings())
      .then(_ => {
        setOpen(true)
        setMsg('Training was deleted successfully')
      })
      .catch(err => console.error(err))
  }

  //for sorting
  const [order, setOrder] = useState();
  const [orderBy, setOrderBy] = useState();

  //sorting functions
  const handleSortRequest = cellId => {
    const isAsc = orderBy === cellId && order === "asc";
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(cellId);
  }

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }


  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  }

  const handleOnchangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }


  const handleClose = () => {
    setOpen(false);
  }

  return (
    <Paper>
      <SearchTraining setFilter={setFilter} />
      <TableContainer>
        <Table aria-label="simple table">
          <TrainingHeader
            orderBy={orderBy}
            order={order}
            handleSortRequest={handleSortRequest}
          />

          <TrainingBody
            stableSort={stableSort}
            trainings={trainings}
            order={order}
            orderBy={orderBy}
            page={page}
            rowsPerPage={rowsPerPage}
            filter={filter}
            emptyRows={emptyRows}
            getComparator={getComparator}
            handleDelete={handleDelete}
          />
        </Table>

        <TablePagination
          component="div"
          rowsPerPageOptions={pages}
          rowsPerPage={rowsPerPage}
          count={trainings.length}
          page={page}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleOnchangeRowsPerPage}
        />
      </TableContainer>

      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message={msg}
      />
    </Paper>
  );
}

export default Trainings;