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

        console.log(data)

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


form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const payload = {
        naam: document.querySelector("#naam").value,
        email: document.querySelector("#email").value,
        telefoonnummer: document.querySelector("#telefoonnummer").value,

    };

    if (fotoInput.files.length > 0){
        console.log("a")
        const reader = new FileReader();
        reader.onload = (event) => {
            const arrayBuffer = event.target.result;
            const uint8Array = new Uint8Array(arrayBuffer);
            payload.profielfoto = Array.from(uint8Array)

            console.log(payload)
            updateProfiel(payload)
                .then((data) => {
                    this.reset();
                    showInfo()

                })
                .catch((data) => {
                    console.log(data)
                    formValidator.showSummary(data.message);
                });


        }
        reader.readAsArrayBuffer(fotoInput.files[0]);
    }else{
        console.log(payload)
        updateProfiel(payload)
            .then((data) => {
                this.reset();
                showInfo()

            })
            .catch((data) => {
                console.log(data)
                formValidator.showSummary(data.message);
            });

    }









});

const fotoInput = document.querySelector("#profielfoto")

fotoInput.addEventListener("change", ()=>{
    console.log(fotoInput.files[0])
    console.log(fotoInput.files[0])
    img.src = URL.createObjectURL(fotoInput.files[0])
})