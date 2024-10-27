import { useState, useEffect } from "react";
import { AgGridReact } from 'ag-grid-react';
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";


function CarList() {
    const [cars, setCars] = useState([]);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState("Car deleted");

    const [colDefs, setColdefs] = useState([
        { field: "brand", filter: true },
        { field: "model", filter: true },
        { field: "color", filter: true, width: 150 },
        { field: "fuel", filter: true },
        { field: "modelYear", filter: true, width: 120 },
        { field: "price", filter: true, width: 150 },
        {
            cellRenderer: params => <Button size="small" color='error' onClick={() => handleDelete(params.data)}>Delete</Button>
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
            fetch(params._links.self.href, { method: "DELETE" })
                .then(response => {
                    if (!response.ok)
                        throw new Error("Error in delete: " + response.statusText);
                    return response.json()
                })
                .then(() => handleFetch())
                .catch(error => console.error(error))
        }
    }

    const handleFetch = () => {
        fetch("https://car-rest-service-carshop.2.rahtiapp.fi/cars")
            .then(response => {
                if (!response.ok)
                    throw new Error("Error in fetch: " + response.statusText);
                return response.json();
            })
            .then(data => setCars(data._embedded.cars))
            .catch(error => console.error(error))
    }

    return (
        <>
            <div className='ag-theme-material' style={{ height: 500 }}>
                <AgGridReact
                    rowData={cars}
                    columnDefs={colDefs}
                    pagination={true}
                    paginationAutoPageSize={true}
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