import {getAllActiviteiten} from "./api/services/activiteitService.js";
import {getActiviteitElement} from "./api/views/activiteitView.js";

const activiteiten = document.querySelector(".activiteiten ul");


const loadActiviteiten = ()=>{
    activiteiten.innerHTML = ""
    const sort = document.querySelector(".sort button.active")?.id || null
    getAllActiviteiten(sort).then((data) =>
        data.forEach((element) => {
            activiteiten.appendChild(getActiviteitElement(element));
        })
    );
}

loadActiviteiten()

const buttons = document.querySelectorAll(".sort button")

const unActive = () => {
    buttons.forEach(e=>{
        e.classList.remove("active")
    })
}

buttons.forEach(e => {
    e.addEventListener("click", ()=>{
        const active = e.classList.contains("active")
        unActive()

        if (!active){
            e.classList.add("active")
        }

        loadActiviteiten()

    })
})

