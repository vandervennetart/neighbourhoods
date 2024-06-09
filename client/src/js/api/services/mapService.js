export const getLocation = (adress)=>{

    const url = "https://maps.googleapis.com/maps/api/geocode/json?address="+ encodeURIComponent(adress)  + "&key=" + import.meta.env.VITE_API_MAPS_KEY
    return fetch(url)
        .then((response)=>{
            if (!response.ok) throw new Error(response.statusCode);
            return response.json();
        }).then((json) => json.results[0].geometry.location)
        .catch(e => console.log(e))
}