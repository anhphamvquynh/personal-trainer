import React, { useEffect, useState } from 'react';
import { Snackbar, TablePagination, Paper, TableContainer, Table } from '@material-ui/core';
import customerService from './services/customerService';
import HeaderCustomer from './Customer/HeaderCustomer';
import SearchCustomer from './Customer/SearchCustomer';
import CustomerTable from './Customer/CustomerTable';
import AddCustomer from './Customer/AddCustomer';

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => getCustomers(), []);
  //for getting customers list. CRUD from here
   const getCustomers = () => {
   customerService
      .getCustomers()
      .then(data => setCustomers(data.content))
      .catch(err => console.error(err))
  };

  //for edit
  const handleEdit = (link, customer) => {
    customerService
      .editCustomer(link, customer)
      .then(_ => getCustomers())
      .then(_ => {
        setOpen(true)
        setMsg('Customer was updated successfully!')
      })
      .catch(err => console.error(err))
  }
  //for deleting
  const handleDelete = customer => {
    customerService
      .deleteCustomer(customer)
      .then(_ => getCustomers())
      .then(_ => {
        setOpen(true)
        setMsg('Customer was deleted successfully')
      })
      .catch(err => console.error(err))
  }
  //for add training
  const handleAddTraining = (newTraining, link) => {
    customerService
      .addTraining(newTraining, link)
      .then(_ => getCustomers())
      .then(_ => {
        setOpen(true)
        setMsg('Training was added successfully')
      })
      .catch(err => console.error(err))
  }
  //for add customers
  const handleAddCustomer = newCustomer => {
    customerService
      .addCustomer(newCustomer)
      .then(_ => getCustomers())
      .then(_ => {
        setOpen(true)
        setMsg('Customer was added successfully')
      })
      .catch(err => console.error(err))
  }

  //for pagination
  const pages = [5, 10, 15];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pages[page]);
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, customers.length - page * rowsPerPage);

  //pagination functions
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }

  //for filtering
  const [filter, setFilter] = useState({ fn: items => { return items } });

  //for sorting
  const [order, setOrder] = useState();
  const [orderBy, setOrderBy] = useState();

  //sorting functions
  const handleSortRequest = cellId => {
    const isAsc = orderBy === cellId && order === "asc";
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(cellId);
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

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  //for snackbar
  const handleClose = () => {
    setOpen(false);
  }

  return (
    <Paper>
      <AddCustomer addCustomer={handleAddCustomer} />
      <SearchCustomer
        setFilter={setFilter}
        handleAddCustomer={handleAddCustomer}
      />
      <TableContainer>
        <Table aria-label="simple table">
          <HeaderCustomer
            orderBy={orderBy}
            order={order}
            handleSortRequest={handleSortRequest}
          />
          <CustomerTable
            stableSort={stableSort}
            customers={customers}
            order={order}
            orderBy={orderBy}
            page={page}
            rowsPerPage={rowsPerPage}
            filter={filter}
            emptyRows={emptyRows}
            getComparator={getComparator}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            handleAddTraining={handleAddTraining}
          />
        </Table>

        <TablePagination
          component="div"
          rowsPerPageOptions={pages}
          rowsPerPage={rowsPerPage}
          count={customers.length}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
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
  )
}
export default Customers;