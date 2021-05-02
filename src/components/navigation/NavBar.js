import React, { useState } from 'react';
import clsx from 'clsx';
import { useTheme, Drawer, CssBaseline, AppBar, Toolbar, Typography, Divider, IconButton, } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Customers from '../Customers';
import Trainings from '../Trainings';
import Calendar from '../Calendar';
import Statistic from '../Statistic';
import useStyles from '../styles/navStyles';
import Link from './Link';
import SearchCustomer from '../Customer/SearchCustomer';
import AddCustomer from '../Customer/AddCustomer';

function NavBar() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  //get trainings list 
  const [trainings, setTrainings] = useState([]);

  //for rendering the components
  const [component, setComponent] = useState('Customers');

  const getTrainings = trainings => {
    setTrainings(trainings)
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };


  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton color="inherit" aria-label="open drawer" onClick={handleDrawerOpen} edge="start">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Personal Trainer
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>

        <Divider />
        <Link setComponent={setComponent} />
        <Divider />
      </Drawer>

      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.toolbar} />
        <div className={classes.drawerHeader} />
        {
          component === 'Customers' ? <Customers />
            : <div /> &&
              component === 'Trainings' ? <Trainings getTrainings={getTrainings} />
              : <div /> &&
               component === 'Calender' ? <Calendar />
               : <div /> &&
                component === 'Statistic' ? <Statistic />
                : <div />
        }
      </main>

    </div>
  );
}

export default NavBar;
