import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { updateCar } from '../carapi';

export default function EditCar(props) {
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
        setCar({
            brand: props.data.brand,
            model: props.data.model,
            color: props.data.color,
            modelYear: props.data.modelYear,
            fuel: props.data.fuel,
            price: props.data.price
        });
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleUpdate = () => {
        updateCar(props.data._links.car.href, car)
            .then(() => props.handleFetch())
            .catch(err => console.log(err))
    }

    return (
        <>
            <Button size="small" onClick={handleClickOpen}>
                Edit
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>Edit Car</DialogTitle>
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
                    <Button onClick={handleUpdate}>Update</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

