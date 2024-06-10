import {logout, refreshAcces} from "./authenticateService.js";

const url = import.meta.env.VITE_API_URL;

export const getAllProfiles = (zoeken) => {
    zoeken += "%"

    return fetch(url + "/profiles?zoeken=" + zoeken)
        .then((response) => {
            if (!response.ok) throw new Error(response.statusCode);
            return response;
        })
        .then((response) => response.json())
        .then((json) => {
            return json;
        })
        .catch((e) => console.log(e));
}

export const getProfile = (id) => {
    return fetch(url + "/profiles/" + id)
        .then((response) => {
            if (!response.ok) throw new Error(response.statusCode);
            return response;
        })
        .then((response) => response.json())
        .then((json) => {
            return json;
        })
        .catch((e) => console.log(e));
}

export const getProfielFoto = (id) =>{
    const accessToken = localStorage.getItem('accesToken');

    return fetch(url + "/profiles/foto/"+id, {
        method: "GET",
        headers: {
            "authorization": `Bearer ${accessToken}`
        }
    }).then(async (response) => {
        if (response.status === 403) {
            return refreshAcces().then(() => {
                getProfielFoto()
            }).catch(() => {
                logout()
            })
        } else if (response.status === 401) {
            await logout()
        } else {
            if (!response.ok) throw new Error(response.statusCode);
        }

        return response;
    })
        .then((response) => response.arrayBuffer())
        .then((ab) => {
            return ab;
        })

        .catch((e) => window.location.href = "/login/")

}