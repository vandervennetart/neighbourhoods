import {FormValidator} from "./Formvalidator.js"
import {login} from "../api/services/authenticateService.js";




const form = document.querySelector("#login");

if (!form) {
    throw new Error("form undefined");
}



const formValidator = new FormValidator(form);



formValidator.addValidator({
    name: "email",
    method: (field) => field.value.trim().length > 0,
    message: "email is een verplicht veld en werd niet ingevuld",
});

formValidator.addValidator({
    name: "wachtwoord",
    method: (field) => field.value.trim().length > 0,
    message: "wachtwoord is een verplicht veld en werd niet ingevuld",
});


// todo: handle form submit event
// post cat + [get cat + show cat | show error ]
form.addEventListener("submit", function (event) {
    event.preventDefault();
    const payload = Object.fromEntries(new FormData(this).entries())

    login(payload)
        .then((data) => {
            localStorage.setItem("accesToken", data.data.accessToken)
            window.location.href = "/home/"

        })
        .catch((data) => {
            formValidator.showSummary(data.message);
        });

    this.reset();
});
