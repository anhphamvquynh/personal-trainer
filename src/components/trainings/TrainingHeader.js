import { TableCell, TableHead, TableRow, TableSortLabel } from '@material-ui/core';
import React from 'react';

export default function TrainingHeader({ orderBy, order, handleSortRequest }) {
    const headCells = [
        { id: 'activity', label: 'Activity' },
        { id: 'duration', label: 'Duration (min)' },
        { id: 'date', label: 'Date' },
        { id: 'customer', label: 'Customer' },
        { id: 'action', label: 'Action' }
    ];

    return (
        <TableHead>
            <TableRow>
                {headCells.map(headCell => (
                    <TableCell
                        key={headCell.id}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={() => { handleSortRequest(headCell.id) }}
                        >
                            {headCell.label}
                        </TableSortLabel>

                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    )
}