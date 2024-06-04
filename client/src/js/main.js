import { getAllProfiles } from "./api/profielService";
import { getProfileElement } from "./api/profielView";
import { getAllActiviteiten } from "./api/activiteitService";
import { getActiviteitElement } from "./api/activiteitView";

const bewoners = document.querySelector(".bewoners ul")
const activiteiten = document.querySelector(".activiteiten ul");

getAllProfiles().then((data) => data.forEach(element => {
    bewoners.appendChild(getProfileElement(element));
}))

getAllActiviteiten().then((data) =>
    data.forEach((element) => {
        activiteiten.appendChild(getActiviteitElement(element));
    })
);