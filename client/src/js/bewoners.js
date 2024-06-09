import {getAllProfiles} from "./api/services/profielService.js";
import {getProfileElement} from "./api/views/profielView.js";
import {logout} from "./api/services/authenticateService.js";
import {stopPropagation} from "ol/events/Event.js";

const bewoners = document.querySelector(".bewoners ul")

const laadProfielen = (zoeken) => {
    getAllProfiles(zoeken).then((data) => {
        bewoners.innerHTML = ""
        data.forEach(element => {

            bewoners.appendChild(getProfileElement(element));
        })

    })
}

laadProfielen("");
document.querySelector("#zoek")?.addEventListener("submit", function (event) {
    event.preventDefault();
    const zoeken = document.querySelector("#zoekbar").value
    console.log(zoeken)
    laadProfielen(zoeken)
})


document.querySelector("#inloggen")?.addEventListener("click", ()=>logout())