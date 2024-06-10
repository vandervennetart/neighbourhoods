import {getProfielInfo, logout, updateProfiel} from "./api/services/authenticateService.js";
import {getProfielFoto} from "./api/services/profielService.js";
import {FormValidator} from "./formvalidator/Formvalidator.js"

const img = document.querySelector("#profielfoto + figure img")

const showInfo = () => {
    getProfielInfo().then(async (data) => {
        const {id, email, naam, telefoonnummer} = data[0]

        document.querySelector("#naam").value = naam
        document.querySelector("#email").value = email
        document.querySelector("#telefoonnummer").value = telefoonnummer

        return id
    }).then((id) => getProfielFoto(id)).then(data =>{


        if (data.byteLength === 0){
            img.src = "/profielfotos/default.png"
        }else{
            const blob = new File([data], "profielfoto.png" ,{type: "image/png"});
            img.src = URL.createObjectURL(blob)
        }
    })
}
showInfo()

const logoutBTN = document.querySelector("#logout")

logoutBTN.addEventListener("click", logout)




const form = document.querySelector("#profiel");

if (!form) {
    throw new Error("form undefined");
}



const formValidator = new FormValidator(form);



formValidator.addValidator({
    name: "naam",
    method: (field) => field.value.trim().length > 0,
    message: "naam is een verplicht veld en werd niet ingevuld",
});

formValidator.addValidator({
    name: "email",
    method: (field) => field.value.trim().length > 0,
    message: "email is een verplicht veld en werd niet ingevuld",
});

formValidator.addValidator({
    name: "telefoonnummer",
    method: (field) => field.value.trim().length > 0,
    message: "telefoonnummer is een verplicht veld en werd niet ingevuld",
});

formValidator.addValidator({
    name: "email",
    method: (field) =>
        field.value
            .trim()
            .match(
                /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/
            ),
    message: "E-mail voldoet niet aan het opgegeven patroon",
});


formValidator.addValidator({
    name: "telefoonnummer",
    method: (field) =>
        field.value
            .trim()
            .match(
                /\+\d{1,2}\s?\d{3}\s?\d{2}\s?\d{2}\s?\d{2}/
            ),
    message: "telefoonnummer voldoet niet aan het opgegeven patroon",
});


form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const payload = {
        naam: document.querySelector("#naam").value,
        email: document.querySelector("#email").value,
        telefoonnummer: document.querySelector("#telefoonnummer").value,

    };

    if (fotoInput.files.length > 0){
        const reader = new FileReader();
        reader.onload = (event) => {
            const arrayBuffer = event.target.result;
            const uint8Array = new Uint8Array(arrayBuffer);
            payload.profielfoto = Array.from(uint8Array)

            updateProfiel(payload)
                .then((data) => {
                    this.reset();
                    showInfo()

                })
                .catch((data) => {
                    formValidator.showSummary(data.message);
                });


        }
        reader.readAsArrayBuffer(fotoInput.files[0]);
    }else{
        updateProfiel(payload)
            .then((data) => {
                this.reset();
                showInfo()

            })
            .catch((data) => {
                formValidator.showSummary(data.message);
            });

    }









});

const fotoInput = document.querySelector("#profielfoto")

fotoInput.addEventListener("change", ()=>{
    img.src = URL.createObjectURL(fotoInput.files[0])
})