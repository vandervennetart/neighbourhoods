export const getActiviteitElement = (data) => {
    const li = document.createElement("li");
    const naam = document.createElement("h3");
    const beschrijving = document.createElement("p");

    const side = document.createElement("div");
    const aantalMensen = document.createElement("p");
    const prijs = document.createElement("p");

    const url = document.createElement("a");
    url.classList.add("overlay-link");


    naam.innerText = data.naam;
    beschrijving.innerText = data.beschrijving;
    aantalMensen.innerText = `aantal mensen: ${data.deelnemers.length}/${data.maxMensen}`;
    prijs.innerText = `€${data.prijs}`;
    url.href = `../activiteitDetail/?id=${data.id}`

    side.appendChild(aantalMensen);
    side.appendChild(prijs);

    li.appendChild(naam);
    li.appendChild(beschrijving);
    li.appendChild(side);
    li.appendChild(url)


    return li;
};