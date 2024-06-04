export const getProfileElement = (data)=>{
    const li = document.createElement("li");
    const img = document.createElement("img");
    const naam = document.createElement("h3");
    const url = document.createElement("a")

    li.classList.add("profilepicture");
    url.href = `../profielDetail/?id=${data.id}`
    url.classList.add("overlay-link")

    naam.innerText = data.naam;
    img.src = data.profielfoto

    li.appendChild(naam)
    li.appendChild(img)
    li.appendChild(url)

    return li
}