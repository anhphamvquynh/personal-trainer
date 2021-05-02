import React from 'react';
import { Button, IconButton, TableBody, TableCell, TableRow } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditCustomer from './EditCustomer';
import AddTraining from '../trainings/AddTraining';

export default function CustomerTable({ stableSort, customers, order, orderBy, page, rowsPerPage, filter, emptyRows, getComparator, handleDelete, handleEdit, handleAddTraining }) {

    return (
        <TableBody>
            {stableSort(filter.fn(customers), getComparator(order, orderBy))
                .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                .map((customer, index) => (
                    <TableRow key={index}>
                        <TableCell align="left">{customer.firstname}</TableCell>
                        <TableCell align="left">{customer.lastname}</TableCell>
                        <TableCell align="left">{customer.streetaddress}</TableCell>
                        <TableCell align="left">{customer.city}</TableCell>
                        <TableCell align="left">{customer.postcode}</TableCell>
                        <TableCell align="left">{customer.email}</TableCell>
                        <TableCell align="left">{customer.phone}</TableCell>

                        <TableCell align="left">
                            {/*For Delete */}
                            <IconButton color="primary" aria-label="delete customer" component="span" onClick={() => handleDelete(customer)}>
                                <DeleteIcon />
                            </IconButton>

                            {/*For Edit */}
                            <IconButton>
                                <EditCustomer
                                    customer={customer}
                                    handleEdit={handleEdit}
                                />
                            </IconButton>

                            {/* For Add Training */}
                            <Button>
                                <AddTraining
                                    customer={customer}
                                    addTraining={handleAddTraining}
                                />
                            </Button>

                        </TableCell>
                    </TableRow>
                ))}
            {emptyRows > 0 && (
                <TableRow style={{ height: (53) * emptyRows }}>
                    <TableCell colSpan={6} />
                </TableRow>
            )}
        </TableBody>
    )
}