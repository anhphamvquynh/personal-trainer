import { TableCell, TableHead, TableRow, TableSortLabel } from '@material-ui/core';
import React from 'react';

export default function HeaderCustomer({ order, orderBy, handleSortRequest }) {
    const headCells = [
        { id: 'firstname', label: 'First name' },
        { id: 'lastname', label: 'Last name' },
        { id: 'address', label: 'Address' },
        { id: 'city', label: 'City' },
        { id: 'postcode', label: 'Postcode' },
        { id: 'email', label: 'Email' },
        { id: 'phone', label: 'Phone' },
        { id: 'action', label: 'Actions' }
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
