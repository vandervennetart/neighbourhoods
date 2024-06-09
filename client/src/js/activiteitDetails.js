import {
    getPost,
} from "./api/services/activiteitService.js";
import {getProfile} from "./api/services/profielService.js";

import dayjs from "dayjs";
import {getProfileElement} from "./api/views/profielView.js";
import {inschrijven} from "./api/services/authenticateService.js";
import {makeMap} from "./api/views/mapsView.js";

import("dayjs/locale/nl-be");


const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get("id");

// Initialize and add the map

let ingeschreven;

const loadPage = () => {
    getPost(id)
        .then(async (data) => {
            console.log(data)
            ingeschreven = data.ingeschreven
            if (ingeschreven) {
                document.querySelector("#inschrijven").innerText = "Schrijf je uit"
            } else {
                document.querySelector("#inschrijven").innerText = "Schrijf je in"
            }


            document.querySelector("#activiteitNaam").innerText = data.naam;
            document.querySelector("#beschrijving").innerText = data.beschrijving;

            document.querySelector("#locatie").innerText = data.plaats;

            const datum = dayjs(data.datum);

            document.querySelector("#dag").innerText = datum
                .locale("nl-be")
                .format("dddd D MMM YYYY");

            document.querySelector("#uur").innerText = datum
                .locale("nl-be")
                .format("H:mm");

            document.querySelector("#prijs").innerText = data.prijs;


            document.querySelector("#aantalMensen").innerText = `${data.deelnemers.length}/${data.maxMensen}`;

            const deelnemers = document.querySelector(".deelnemers ul");

            deelnemers.innerHTML = "" //remove all children

            data.deelnemers.forEach((element) => {
                deelnemers.appendChild(getProfileElement(element));
            });
            return data;
        }).then(async data => {
        await makeMap(data)
        return data
    })
        .then((data) => getProfile(data.organisator_id))
        .then((data) => {
            const organisator = document.querySelector(".organisatoren ul");
            organisator.innerHTML = "" //remove all children
            organisator.appendChild(getProfileElement(data[0]));
        })
}

loadPage()


document.querySelector("#inschrijven").addEventListener("click", () => {
    return inschrijven(id)
        .then(() => loadPage())
        .catch((data) => alert(data.data.message))
})


