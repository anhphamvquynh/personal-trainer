import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText, } from '@material-ui/core';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import EventIcon from '@material-ui/icons/Event';
import EqualizerIcon from '@material-ui/icons/Equalizer';


export default function Link({ setComponent }) {

    return (
        <List>
            <ListItem button onClick={() => setComponent('Customers')}>
                <ListItemIcon> <AccountBoxIcon /> </ListItemIcon>
                <ListItemText primary="Customers" />
            </ListItem>

            <ListItem button onClick={() => setComponent('Trainings')}>
                <ListItemIcon> <DirectionsRunIcon /> </ListItemIcon>
                <ListItemText primary="Trainings" />
            </ListItem>

            <ListItem button onClick={() => setComponent('Calender')}>
                <ListItemIcon> <EventIcon /> </ListItemIcon>
                <ListItemText primary="Calender" />
            </ListItem>

            <ListItem button onClick={() => setComponent('Statistic')}>
                <ListItemIcon> <EqualizerIcon /> </ListItemIcon>
                <ListItemText primary="Statistics" />
            </ListItem>
        </List>
    )
}