export function getCars() {
    return fetch(import.meta.env.VITE_API_URL)
        .then(response => {
            if (!response.ok)
                throw new Error("Error in fetch: " + response.statusText);
            return response.json();
        })
}

export function deleteCar(url) {
    return fetch(url, { method: "DELETE" })
        .then(response => {
            if (!response.ok)
                throw new Error("Error in delete: " + response.statusText);
            return response.json()
        })
}

export function saveCar(newCar) {
    return fetch(import.meta.env.VITE_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCar)
    })
        .then(response => {
            if (!response.ok)
                throw new Error("Error in saving: " + response.statusText);
            return response.json()
        })
}

export function updateCar(url, car) {
    return fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(car)
    })
        .then(response => {
            if (!response.ok)
                throw new Error("Error in saving: " + response.statusText);
            return response.json()
        })
}

