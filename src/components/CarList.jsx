import { useState, useEffect } from "react";
import { AgGridReact } from 'ag-grid-react';
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import { getCars, deleteCar } from "../carapi";
import AddCar from "./AddCar";
import EditCar from "./EditCar";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";


function CarList() {
    const [cars, setCars] = useState([]);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState("Car deleted");

    const [colDefs, setColdefs] = useState([
        { field: "brand", filter: true, width: 150 },
        { field: "model", filter: true, width: 150 },
        { field: "color", filter: true, width: 150 },
        { field: "fuel", filter: true, width: 150 },
        { field: "modelYear", filter: true, width: 120 },
        { field: "price", filter: true, width: 150 },
        {
            cellRenderer: params => <Button size="small" color='error' onClick={() => handleDelete(params.data)}>Delete</Button>,
            width: 150
        },
        {
            cellRenderer: params => <EditCar data={params.data} handleFetch={handleFetch} />
        }
    ]);

    useEffect(() => {
        handleFetch();
    }, []);

    const handleClose = () => {
        setOpen(false);
    }

    const handleDelete = (params) => {
        if (window.confirm("Are you sure?")) {
            setOpen(true);
            deleteCar(params._links.self.href)
                .then(() => handleFetch())
                .catch(error => console.error(error))
        }
    }

    const handleFetch = () => {
        getCars()
            .then(data => setCars(data._embedded.cars))
            .catch(error => console.error(error))
    }

    return (
        <>
            <AddCar handleFetch={handleFetch} />
            <div className='ag-theme-material' style={{ height: 500 }}>
                <AgGridReact
                    rowData={cars}
                    columnDefs={colDefs}
                    pagination={true}
                    paginationAutoPageSize={true}
                    suppressCellFocus={true}
                />
                <Snackbar
                    open={open}
                    message="Car deleted"
                    autoHideDuration={3000}
                    onClose={handleClose}
                />
            </div >
        </>
    );
}

export default CarList;