import {jwtDecode} from "jwt-decode";
import {activiteitVerwijderen} from "../services/authenticateService.js";


export const getActiviteitElement = (data) => {
    const li = document.createElement("li");
    const naam = document.createElement("h3");
    const beschrijving = document.createElement("p");

    const side = document.createElement("div");
    const aantalMensen = document.createElement("p");
    const prijs = document.createElement("p");

    const url = document.createElement("a");
    url.classList.add("overlay-link");


    naam.innerText = data.naam;
    beschrijving.innerText = data.beschrijving;
    aantalMensen.innerText = `aantal mensen: ${data.deelnemers.length}/${data.maxMensen||"-"}`;
    prijs.innerText = `€${data.prijs}`;
    url.href = `../activiteitDetail/?id=${data.id}`

    side.appendChild(aantalMensen);
    side.appendChild(prijs);

    li.appendChild(naam);
    li.appendChild(beschrijving);
    li.appendChild(side);
    li.appendChild(url)



    const accessToken = localStorage.getItem('accesToken');
    if (accessToken && jwtDecode(accessToken).id.id === 1){
        const deletebtn = document.createElement("button")

        deletebtn.innerHTML = "<span></span><span></span><p>delete</p>"
        deletebtn.classList.add("deletebtn")
        deletebtn.addEventListener("click", () => activiteitVerwijderen(data.id).then(() => location.reload()))

        li.appendChild(deletebtn)
    }


    return li;
};