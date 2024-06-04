const url = import.meta.env.VITE_API_URL;

export const getAllProfiles = () => {
    return fetch(url + "/profiles")
        .then((response) => {
            if (!response.ok) throw new Error(response.statusCode);
            return response;
        })
        .then((response) => response.json())
        .then((json) => {
            console.log(json);
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
            console.log(json);
            return json;
        })
        .catch((e) => console.log(e));
}