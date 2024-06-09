const url = import.meta.env.VITE_API_URL;

export const login = (payload) => {
    return fetch(url + "/authenticate/login", {
        method: "POST",
        credentials: "include",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload)
    })
        .then(async res => {
            if (!res.ok) {
                throw new Error("server error")
            }

            return res.json();
        })
        .then((json) => {
            if (json.status === "failed") throw json;

            return json;
        })
};

export const register = (payload) => {
    return fetch(url + "/authenticate/register", {
        method: "POST",
        credentials: "include",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload)
    })
        .then(async res => {
            if (!res.ok) {
                throw new Error("server error")
            }

            return res.json();
        })
        .then((json) => {
            if (json.status === "failed") throw json;

            return json
        })
};

export const getProfielInfo = () => {
    const accessToken = localStorage.getItem('accesToken');

    return fetch(url + "/authenticate/profiel", {
        method: "GET",
        headers: {
            "authorization": `Bearer ${accessToken}`
        }
    }).then(async (response) => {
        if (response.status === 403) {
            return refreshAcces().then(() => {
                getProfielInfo()
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
        .then((response) => response.json())
        .then((json) => {
            return json;
        })

        .catch((e) => logout(e))

}

export const refreshAcces = () => {
    return fetch(url + "/authenticate/token", {
        method: "GET",
        credentials: "include"
    }).then((response) => response.json())
        .then((json) => {

            localStorage.setItem("accesToken", json.data.accessToken)


        })
        .catch((e) => logout(e));
}

export const logout = (e) => {

    localStorage.setItem("accesToken", "")
    return fetch(url + "/authenticate/login", {
        method: "DELETE",
        credentials: "include"
    }).then((response) => {
        if (!response.ok) throw new Error(response.statusCode);
        return response;
    })
        .then((response) => window.location.href = "/login/")
        .then(()=>{
            console.log(e)
        })
        .catch((e) => console.log(e));
}

export const updateProfiel = (payload) => {
    const accessToken = localStorage.getItem('accesToken');
    console.log(JSON.stringify(payload.profielfoto))
    return fetch(url + "/authenticate/Profiel", {
        method: "PATCH",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "authorization": `Bearer ${accessToken}`
        },
        body: JSON.stringify({payload}),
    }).then(async (res) => {
        if (!res.ok) {
            const message = await res.json();
            throw message;
        }
        return res.json();
    });
}


export const inschrijven = (id) => {
    const accessToken = localStorage.getItem('accesToken');
    return fetch(url + "/authenticate/posts/inschrijven/" + id, {
        method: "POST",
        headers: {
            "authorization": `Bearer ${accessToken}`
        }
    }).then(async (response) => {
        if (response.status === 403) {
            return refreshAcces().then(() => {
                inschrijven(id)
            }).catch(() => {
                logout()
            })
        } else if (response.status === 401) {
            await logout()
        } else if (response.status === 400) {
            throw await response.json()
        }else {
            if (!response.ok) throw new Error(response.statusCode);
        }
        return response;
    })
        .then((response) => response.json())
        .then((json) => {
            return json;
        })
}

export const activiteitMaken = (payload) => {
    const accessToken = localStorage.getItem('accesToken');
    return fetch(url + "/authenticate/posts", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "authorization": `Bearer ${accessToken}`
        },
        body: JSON.stringify({payload}),
    }).then(async (response) => {
        if (response.status === 403) {
            return refreshAcces().then(() => {
                activiteitMaken(payload)
            }).catch(() => {
                logout()
            })
        } else if (response.status === 401) {
            await logout()
        } else {
            if (!response.ok) {
                throw await response.json();
            }
        }
        return response.json();
    })
}


export const activiteitVerwijderen = (id) => {
    const accessToken = localStorage.getItem('accesToken');
    return fetch(url + "/authenticate/posts/" + id, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "authorization": `Bearer ${accessToken}`
        }
    }).then(async (response) => {
        if (response.status === 403) {
            return refreshAcces().then(() => {
                activiteitVerwijderen()
            }).catch(() => {
                logout()
            })
        } else if (response.status === 401) {
            await logout()
        } else {
            if (!response.ok) {
                throw await response.json();
            }
        }
        return response.json();
    })
}


export const bewonerVerwijderen = (id) => {
    const accessToken = localStorage.getItem('accesToken');
    return fetch(url + "/authenticate/profiel/" + id, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "authorization": `Bearer ${accessToken}`
        }
    }).then(async (response) => {
        if (response.status === 403) {
            return refreshAcces().then(() => {
                bewonerVerwijderen()
            }).catch(() => {
                logout()
            })
        } else if (response.status === 401) {
            await logout()
        } else {
            if (!response.ok) {
                throw await response.json();
            }
        }
        return response.json();
    })
}








