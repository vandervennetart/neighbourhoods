import {getProfielFoto} from "../services/profielService.js";
import {jwtDecode} from "jwt-decode";
import {bewonerVerwijderen} from "../services/authenticateService.js";

export const getProfileElement = (data)=>{
    const li = document.createElement("li");
    const img = document.createElement("img");
    const naam = document.createElement("h3");
    const overlay = document.createElement("a")
    const figure = document.createElement("figure")

    li.classList.add("profilepicture");
    overlay.href = `../profielDetail/?id=${data.id}`
    overlay.classList.add("overlay-link")

    naam.innerText = data.naam;

    try {
        getProfielFoto(data.id).then(data =>{
            if (data.byteLength === 0){
                img.src = "/profielfotos/default.png"
            }else{
                const blob = new File([data], "profielfoto.png" ,{type: "image/png"});
                img.src = URL.createObjectURL(blob)
            }



        })
    }catch (e){
        img.src = URL("/profielfotos/default.png")
    }


    figure.appendChild(img)


    const accessToken = localStorage.getItem('accesToken');
    if (accessToken && jwtDecode(accessToken).id.id === 1){
        const deletebtn = document.createElement("button")

        deletebtn.innerHTML = "<span></span><span></span><p>delete</p>"
        deletebtn.classList.add("deletebtn")
        deletebtn.addEventListener("click", () => bewonerVerwijderen(data.id).then(() => location.reload()))

        li.appendChild(deletebtn)
    }

    li.appendChild(naam)
    li.appendChild(figure)
    li.appendChild(overlay)

    return li
}