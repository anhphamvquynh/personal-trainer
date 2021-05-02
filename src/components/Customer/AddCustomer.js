import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { IconButton } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';

function AddCustomer(props) {
    const [open, setOpen] = useState(false);
    const [customer, setCustomer] = useState({
        firstname: '',
        lastname: '',
        streetaddress: '',
        city: '',
        postcode: '',
        email: '',
        phone: '',
    })

    const handleClickOpen = () => {
        setOpen(true)
    };

    const handleClose = () => {
        setOpen(false);
    };

    const inputChanged = event => {
        setCustomer({ ...customer, [event.target.name]: event.target.value })
    }

    const handleSave = () => {
        props.addCustomer(customer);
        handleClose();
    }

    return (
        <div>
            <IconButton color="primary" aria-label="add customer" component="span" onClick={handleClickOpen}>
                <AddCircleIcon />
            </IconButton>

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add customer</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        name="firstname"
                        value={customer.firstname}
                        onChange={inputChanged}
                        margin="dense"
                        label="Firstname"
                        fullWidth
                    />
                    <TextField
                        name="lastname"
                        value={customer.lastname}
                        onChange={inputChanged}
                        margin="dense"
                        label="Lastname"
                        fullWidth
                    />
                    <TextField
                        name="streetaddress"
                        value={customer.streetaddress}
                        onChange={inputChanged}
                        margin="dense"
                        label="Address"
                        fullWidth
                    />
                    <TextField
                        name="city"
                        value={customer.city}
                        onChange={inputChanged}
                        margin="dense"
                        label="City"
                        fullWidth
                    />
                    <TextField
                        name="postcode"
                        value={customer.postcode}
                        onChange={inputChanged}
                        margin="dense"
                        label="Postcode"
                        fullWidth
                    />
                    <TextField
                        name="email"
                        value={customer.email}
                        onChange={inputChanged}
                        margin="dense"
                        label="Email"
                        fullWidth
                    />

                    <TextField
                        name="phone"
                        value={customer.phone}
                        onChange={inputChanged}
                        margin="dense"
                        label="Phone"
                        fullWidth
                    />

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


export default AddCustomer;