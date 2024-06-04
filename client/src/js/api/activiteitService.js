const url = import.meta.env.VITE_API_URL;

export const getAllActiviteiten = () => {
    return fetch(url + "/posts")
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
};

export const getAllOrganised = (id) => {
    return fetch(url + "/posts/ofProfile/"+ id +"/organiseerd")
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
};

export const getAllParticipant = (id) => {
    return fetch(url + "/posts/ofProfile/" + id + "/deelname")
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
};
