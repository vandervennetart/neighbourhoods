import {FormValidator} from "./Formvalidator.js"
import {activiteitMaken} from "../api/services/authenticateService.js";




const form = document.querySelector("#activiteitMaken");

if (!form) {
    throw new Error("form undefined");
}



const formValidator = new FormValidator(form);



formValidator.addValidator({
    name: "naam",
    method: (field) => field.value.trim().length > 0,
    message: "naam van de activiteit is een verplicht veld en werd niet ingevuld",
});

formValidator.addValidator({
    name: "beschrijving",
    method: (field) => field.value.trim().length > 0,
    message: "beschrijving is een verplicht veld en werd niet ingevuld",
});

formValidator.addValidator({
    name: "prijs",
    method: (field) => field.value.trim().length > 0,
    message: "prijs is een verplicht veld en werd niet ingevuld",
});

formValidator.addValidator({
    name: "plaats",
    method: (field) => field.value.trim().length > 0,
    message: "plaats is een verplicht veld en werd niet ingevuld",
});

formValidator.addValidator({
    name: "datum",
    method: (field) => field.value.trim().length > 0,
    message: "datum en tijdstip is een verplicht veld en werd niet ingevuld",
});

formValidator.addValidator({
    name: "prijs",
    method: (field) => !isNaN(field.value.trim()),
    message: "Prijs moet een nummer zijn en er werd geen nummer meegegeven",
});

formValidator.addValidator({
    name: "maxMensen",
    method: (field) => !isNaN(field.value.trim()),
    message: "max mensen moet een nummer zijn en er werd geen nummer meegegeven",
});


formValidator.addValidator({
    name: "datum",
    method: (field) => !isNaN((new Date(field.value)).valueOf()),
    message: "datum moet een datum zijn",
});


// todo: handle form submit event
// post cat + [get cat + show cat | show error ]
form.addEventListener("submit", function (event) {
    event.preventDefault();
    const payload = Object.fromEntries(new FormData(this).entries())
    // {
    //     name: document.querySelector("#name").value,
    //     location: document.querySelector("#location").value,
    //     sex: document.querySelector("#sex").value,
    //     age: document.querySelector("#age").value,
    //     img_url: document.querySelector("#img_url").value,
    // };
    let ok = false;
    activiteitMaken(payload)
        .then((data) => {
            window.location.href = "/activiteitDetail/?id=" + data.data.id

        })
        .catch((data) => {
            formValidator.showSummary(data.message);
        });

    this.reset();
});
