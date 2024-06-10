import  jwt from "jsonwebtoken"
const {sign, verify} = jwt
import * as dotenv from "dotenv";

dotenv.config()
export const accessTokenSecret  = process.env.ACCESSTOKENSECRET;

export const refreshTokenSecret  = process.env.REFRESHTOKENSECRET;

export const generateRefreshToken = (id ) => {
    return sign({id: id}, refreshTokenSecret, {expiresIn: 86400}) //every day
}
export const generateAccessToken = (id ) => {
    return sign({id: id}, accessTokenSecret, {expiresIn: 3600}) //every hour
}

export const authenticateToken = (req, res, next) => {

    const authHeader = req.headers['authorization']

    const token = authHeader && authHeader.split(' ')[1]




    if (token == null) return res.sendStatus(401) //no token

    verify(token, accessTokenSecret, (err, id) => {



        if (err) return res.sendStatus(403) //invalid token
        req.id = id
        next()
    })
}

export const updateValidation = (req, res, next) => {
    const errors = []

    const {naam, email, telefoonnummer} = req.body.payload

    // if errors ?
    if (Object.keys(errors).length) {
        return res.status(400).json({
            status: "fail",
            message: errors,
        });
    }

    if (!naam?.length) {
        errors.push({
            name: "naam",
            message: "naam is een verplicht veld en werd niet ingevuld",
        });
    }

    if (!email?.length) {
        errors.push({
            name: "email",
            message: "email is een verplicht veld en werd niet ingevuld",
        });
    }

    if (!telefoonnummer?.length) {
        errors.push({
            name: "telefoonnummer",
            message: "telefoonnummer is een verplicht veld en werd niet ingevuld",
        });
    }

    if (!email?.trim().match(
            /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/
        )) {
        errors.push({
            name: "email",
            message: "E-mail voldoet niet aan het opgegeven patroon\"",
        });
    }

    if (!telefoonnummer?.trim().match(
            /\+\d{1,2}\s\d{3}\s\d{2}\s\d{2}\s\d{2}/
        )) {
        errors.push({
            name: "telefoonnummer",
            message: "telefoonnummer voldoet niet aan het opgegeven patroon",
        });
    }



    if (Object.keys(errors).length) {
        return res.status(400).json({
            status: "fail",
            message: errors,
        });
    }

    // else: always next!
    next();
}

export const loginValidation = (req, res, next) => {
//todo
    const {email, wachtwoord} = req.body

    const errors = []

    if (!email?.trim().length) {
        errors.push({
            name: "email",
            message: "email is een verplicht veld en werd niet ingevuld",
        });
    }

    if (!wachtwoord?.trim().length){
        errors.push({
            name: "wachtwoord",
            message: "wachtwoord is een verplicht veld en werd niet ingevuld",
        });
    }

    // if errors ?
    if (Object.keys(errors).length) {
        return res.status(400).json({
            status: "fail",
            message: errors,
        });
    }

    // else: always next!
    next();
};

export const registerValidation = (req, res, next) => {
    const errors = []
    const {naam, email, telefoonnummer, wachtwoord, herhaalWachtwoord} = req.body

    // if errors ?
    if (Object.keys(errors).length) {
        return res.status(400).json({
            status: "fail",
            message: errors,
        });
    }

    if (!naam?.trim().length) {
        errors.push({
            name: "naam",
            message: "naam is een verplicht veld en werd niet ingevuld",
        });
    }

    if (!email?.trim().length) {
        errors.push({
            name: "email",
            message: "email is een verplicht veld en werd niet ingevuld",
        });
    }

    if (!telefoonnummer?.trim().length) {
        errors.push({
            name: "telefoonnummer",
            message: "telefoonnummer is een verplicht veld en werd niet ingevuld",
        });
    }

    if (!email?.trim().match(
        /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/
    )) {
        errors.push({
            name: "email",
            message: "E-mail voldoet niet aan het opgegeven patroon\"",
        });
    }

    if (!telefoonnummer?.trim().match(
        /\+\d{1,2}\s?\d{3}\s?\d{2}\s?\d{2}\s?\d{2}/
    )) {
        errors.push({
            name: "telefoonnummer",
            message: "telefoonnummer voldoet niet aan het opgegeven patroon",
        });
    }

    if (wachtwoord?.trim().length < 7){
        errors.push({
            name: "wachtwoord",
            message: "wachtwoord moet minimum 7 karakters groot zijn",
        });
    }

    let hasNumber = false
    wachtwoord.forEach(e=>{
        if (!isNaN(e)) hasNumber = true
    })
    if (hasNumber){
        errors.push({
            name: "wachtwoord",
            message: "wachtwoord voldoet niet aan het gevraagde formaat",
        });
    }


    if (!(herhaalWachtwoord === wachtwoord)){
        errors.push({
            name: "herhaalWachtwoord",
            message: "Herhaal wachtwoord moet gelijk zijn aan wachtwoord en dat is niet zo",
        });
    }

    // if errors ?
    if (Object.keys(errors).length) {
        return res.status(400).json({
            status: "fail",
            message: errors,
        });
    }

    // else: always next!
    next();
};

export const activiteitMakenValidation = (req, res, next) => {
//todo
    const {naam, beschrijving, prijs, plaats, datum, maxMensen} = req.body.payload

    const errors = []

    if (!naam?.trim().length) {
        errors.push({
            name: "naam",
            message: "naam is een verplicht veld en werd niet ingevuld",
        });
    }

    if (!beschrijving?.trim().length) {
        errors.push({
            name: "beschrijving",
            message: "beschrijving is een verplicht veld en werd niet ingevuld",
        });
    }

    if (!prijs?.trim().length) {
        errors.push({
            name: "prijs",
            message: "prijs is een verplicht veld en werd niet ingevuld",
        });
    }

    if (!plaats?.trim().length) {
        errors.push({
            name: "plaats",
            message: "plaats is een verplicht veld en werd niet ingevuld",
        });
    }

    if (!datum?.trim().length) {
        errors.push({
            name: "datum",
            message: "datum is een verplicht veld en werd niet ingevuld",
        });
    }



    if (isNaN((new Date(datum)).valueOf())) {
        errors.push({
            name: "datum",
            message: "datum moet een datum zijn",
        });
    }

    if (isNaN(prijs)){
        errors.push({
            name: "prijs",
            message: "prijs mensen moet een nummer zijn",
        });
    }

    if (isNaN(maxMensen)){
        errors.push({
            name: "maxMensen",
            message: "max mensen moet een nummer zijn",
        });
    }






    // if errors ?
    if (Object.keys(errors).length) {
        return res.status(400).json({
            status: "fail",
            message: errors,
        });
    }

    // else: always next!
    next();
};

