
import { getAllOrganised, getAllParticipant } from "./api/services/activiteitService.js";
import { getActiviteitElement } from "./api/views/activiteitView.js";
import {getProfielFoto, getProfile} from "./api/services/profielService.js";

const activiteiten = document.querySelectorAll(".activiteiten ul");
const naam = document.querySelector("#naam");
const tel = document.querySelector("#telefoonnummer");
const email = document.querySelector("#email");
const img = document.querySelector("#foto");

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get("id")



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
    getProfielFoto(data[0].id).then(data =>{
        if (data.byteLength === 0){
            img.src = "/profielfotos/default.png"
        }else{
            const blob = new File([data], "profielfoto.png" ,{type: "image/png"});
            img.src = URL.createObjectURL(blob)
        }



    })
})
