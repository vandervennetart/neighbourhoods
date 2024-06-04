
import { getAllOrganised, getAllParticipant } from "./api/activiteitService";
import { getActiviteitElement } from "./api/activiteitView";
import { getProfile } from "./api/profielService";

const activiteiten = document.querySelectorAll(".activiteiten ul");
const naam = document.querySelector("#naam");
const tel = document.querySelector("#telefoonnummer");
const email = document.querySelector("#email");
const img = document.querySelector("#foto");

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get("id")

console.log(id)


getAllOrganised(id).then((data) =>
    data.forEach((element) => {
        activiteiten[0].appendChild(getActiviteitElement(element));
    })
);

getAllParticipant(id).then((data) =>
    data.forEach((element) => {
        activiteiten[1].appendChild(getActiviteitElement(element));
    })
);

getProfile(id).then(data => {
    naam.innerText = data[0].naam;
    tel.innerText = data[0].telefoonnummer;
    email.innerText = data[0].email;
    img.innerText = data[0].profielfoto;
})
