import React from 'react';
import { InputBase, Toolbar, Typography } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import useStyles from '../styles/trainingStyle';

export default function SearchTraining({ setFilter }) {
    const classes = useStyles();
    const handleSearch = e => {
        let value = e.target.value;
        setFilter({
            fn: items => {
                if (value === "")
                    return items;
                else
                    return items.filter(item => item.activity.toLowerCase().includes(value));
            }
        })
    }

    return (
        <Toolbar>
            <Typography>Trainings</Typography>
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
        </Toolbar>
    )
}