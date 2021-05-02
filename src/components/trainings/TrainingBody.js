import React from 'react';
import moment from 'moment';
import { IconButton, TableBody, TableCell, TableRow } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

export default function TrainingBody({ stableSort, trainings, order, orderBy, page, rowsPerPage, filter, emptyRows, getComparator, handleDelete }) {
    return (
        <TableBody>
            {stableSort(filter.fn(trainings), getComparator(order, orderBy))
                .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                .map((training) => (
                    <TableRow key={training.id}>
                        <TableCell component="th" scope="row">
                            {training.activity}
                        </TableCell>
                        <TableCell align="left">{training.duration}</TableCell>
                        <TableCell align="left">{moment(training.date).format('DD.MM.YYYY hh:mm a')}</TableCell>
                        <TableCell align="left">{training.customer.firstname + ' ' + training.customer.lastname}</TableCell>

                        <TableCell align="left">
                            {/*For Delete */}
                            <IconButton color="primary" aria-label="delete customer" component="span" onClick={() => handleDelete(training)} >
                                <DeleteIcon />
                            </IconButton>
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