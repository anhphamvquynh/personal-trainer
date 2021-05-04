import React from 'react';
import { InputBase, Toolbar, Typography } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import useStyles from '../styles/customerStyles';
import AddCustomer from './AddCustomer';

export default function SearchCustomer({ setFilter, handleAddCustomer }) {
    const classes = useStyles();
    //for filtering
    const handleSearch = e => {
        let value = e.target.value;
        setFilter({
            fn: items => {
                if (value === "") {
                    return items;
                } else {
                    return items.filter(x => x.firstname.toLowerCase().includes(value));
                }
            }
        })
    }

    return (
        <Toolbar>
            <Typography>Customers</Typography>
            <div className={classes.search} onChange={handleSearch}>
                <div className={classes.searchIcon}>
                    <SearchIcon />
                </div>
                <InputBase
                    placeholder="Search"
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                />
            </div>
            <AddCustomer addCustomer={handleAddCustomer} />
        </Toolbar>
    )
}