import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { saveCar } from '../carapi';

export default function AddCar(props) {
    const [open, setOpen] = useState(false);
    const [car, setCar] = useState({
        brand: "",
        model: "",
        color: "",
        modelYear: "",
        fuel: "",
        price: ""
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        saveCar(car)
            .then(() => {
                props.handleFetch();
                handleClose();
                setCar({
                    brand: "",
                    model: "",
                    color: "",
                    modelYear: "",
                    fuel: "",
                    price: ""
                })
            })
            .catch(err => console.error(err))
    }

    return (
        <>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add Car
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>New Car</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        name="brand"
                        value={car.brand}
                        onChange={e => setCar({ ...car, brand: e.target.value })}
                        label="Brand"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        name="model"
                        value={car.model}
                        onChange={e => setCar({ ...car, model: e.target.value })}
                        label="Model"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        name="color"
                        value={car.color}
                        onChange={e => setCar({ ...car, color: e.target.value })}
                        label="Color"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        name="fuel"
                        value={car.fuel}
                        onChange={e => setCar({ ...car, fuel: e.target.value })}
                        label="Fuel"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        name="modelYear"
                        value={car.modelYear}
                        onChange={e => setCar({ ...car, modelYear: e.target.value })}
                        label="Model Year"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        name="price"
                        value={car.price}
                        onChange={e => setCar({ ...car, price: e.target.value })}
                        label="Price (€)"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

