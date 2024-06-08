import {getAllProfiles} from "./api/services/profielService.js";
import {getProfileElement} from "./api/views/profielView.js";
import {logout} from "./api/services/authenticateService.js";

const bewoners = document.querySelector(".bewoners ul")


getAllProfiles().then((data) => data.forEach(element => {
    bewoners.appendChild(getProfileElement(element));
}))

document.querySelector("#inloggen")?.addEventListener("click", ()=>logout())