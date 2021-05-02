import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Select from '@material-ui/core/Select';
import { FormControl, InputLabel } from '@material-ui/core';

function AddTraining(props) {
    const [open, setOpen] = useState(false);
    const [training, setTraining] = useState({
        name: `${props.customer.firstname} ${props.customer.lastname}`,
        activity: '',
        duration: '',
        date: new Date(),
    })

    const link = props.customer.links[0].href

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleSave = () => {
        props.addTraining(training, link)
        handleClose();
    }

    const inputChanged = event => {
        setTraining({ ...training, [event.target.name]: event.target.value })
    }

    const handleDate = newDate => {
        setTraining({ ...training, date: newDate })
    }

    return (
        <div>
            <Button color="primary" onClick={handleClickOpen}>
                ADD TRAINING
            </Button>

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add Training ({`${props.customer.firstname} ${props.customer.lastname}`})</DialogTitle>
                <DialogContent>
                    <FormControl>
                        <InputLabel htmlFor="age-native-simple">Activity</InputLabel>
                        <Select
                            native
                            value={training.activity}
                            onChange={inputChanged}
                            inputProps={{
                                name: 'activity',
                            }}
                        >
                            <option aria-label="None" value="" />
                            <option>Jogging</option>
                            <option>Boxing</option>
                            <option>Cycling</option>
                            <option>Gym training</option>
                            <option>Spinning</option>
                            <option>Zumba</option>
                        </Select>
                    </FormControl>

                    <TextField                        
                        name="duration"
                        value={training.duration}
                        onChange={inputChanged}
                        margin="dense"
                        label="Duration (min)"
                        fullWidth

                    />

                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DateTimePicker
                            label="Date"
                            value={training.date}
                            onChange={date => handleDate(date)}
                        />
                    </MuiPickersUtilsProvider>


                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>

                    <Button onClick={handleSave} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>

        </div>
    )
}


export default AddTraining;