import {FormValidator} from "./Formvalidator.js";
import {login, register, updateProfiel} from "../api/services/authenticateService.js";

const form = document.querySelector("#registreer");



if (!form) {
    throw new Error("form undefined");
}

const isNumber = (str) => {
    return str.length === 1 && [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(str);
}


const formValidator = new FormValidator(form);


formValidator.addValidator({
    name: "naam",
    method: (field) => field.value.trim().length > 0,
    message: "naam is een verplicht veld en werd niet ingevuld",
});

formValidator.addValidator({
    name: "email",
    method: (field) =>
        field.value
            .trim()
            .match(
                /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
            ),
    message: "E-mail voldoet niet aan het opgegeven patroon",
});

formValidator.addValidator({
    name: "tel",
    method: (field) => field.value.trim().length > 0,
    message: "telefoonnummer is een verplicht veld en werd niet ingevuld",
});


formValidator.addValidator({
    name: "wachtwoord",
    method: (field) => field.value.trim().length > 6,
    message: "wachtwoord is een verplicht veld en werd niet ingevuld",
});

formValidator.addValidator({
    name: "wachtwoord", method: (field) => {
        let outcome = false

        field.value.trim().split("").forEach((letter)=>{
            // console.log(!isNaN(+letter))
            if (!isNaN(+letter)) {
                outcome = true
            }
        })

        return outcome
    }, message: "wachtwoord voldoet niet aan het gevraagde formaat",
});


formValidator.addValidator({
    name: "herhaalWachtwoord",
    method: (field) => field.value.trim().length > 0,
    message: "Herhaal wachtwoord is een verplicht veld en werd niet ingevuld",
});

formValidator.addValidator({
    name: "herhaalWachtwoord",
    method: (field) => field.value === document.querySelector("#wachtwoord").value,
    message: "Herhaal wachtwoord moet gelijk zijn aan wachtwoord en dat is niet zo",
});

formValidator.addValidator({
    name: "privacy", method: (field) => field.checked, message: "Deze checkbox is verplicht en is niet aangeduid",
});


form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const payload = Object.fromEntries(new FormData(this).entries())

    console.log(payload)
    register(payload)
        .then((data) => {
            console.log(data)
            localStorage.setItem("accesToken", data.data.accessToken)
            window.location.href = "/home/"

        })
        .catch((data) => {
            formValidator.showSummary(data.message);
        });

    //bewust geen this.reset => das ambetant en onnodig als ge u aant registreren zijt


});