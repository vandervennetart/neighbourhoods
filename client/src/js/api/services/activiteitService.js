

const url = import.meta.env.VITE_API_URL;

export const getAllActiviteiten = (sort) => {
    return fetch(url + "/posts?sort=" + sort)
        .then((response) => {
            if (!response.ok) throw new Error(response.statusCode);
            return response;
        })
        .then((response) => response.json())
        .then((json) => {
            return json;
        })
        .catch((e) => console.log(e));
};

export const getAllOrganised = (id) => {
    return fetch(url + "/posts/ofProfile/" + id + "/organiseerd")
        .then((response) => {
            if (!response.ok) throw new Error(response.statusCode);
            return response;
        })
        .then((response) => response.json())
        .then((json) => {
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
            return json;
        })
        .catch((e) => console.log(e));
};

export const getPost = (id) => {
    const accessToken = localStorage.getItem('accesToken');
    return fetch(url + "/authenticate/posts/" + id, {
        method : "POST",
        headers: {
            "authorization" : `Bearer ${accessToken}`
        }
    })
        .then((response) => {
            if (response.status === 401 || response.status === 403){
                return fetch(url + "/posts/" + id, {
                    method : "get"
                })
            }
            if (!response.ok) throw new Error(response.statusCode);
            return response;
        })
        .then((response) => response.json())
        .then((json) => {
            return json;
        })
        .catch((e) => console.log(e));
};

