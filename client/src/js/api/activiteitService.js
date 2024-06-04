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
