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


        console.log(id)

        if (err) return res.sendStatus(403) //invalid token
        req.id = id
        next()
    })
}

export const updateValidation = (req, res, next) => {
    const errors = []

    console.log(req.body.payload)

    const {naam, email, telefoonnummer, profielfoto} = req.body.payload

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

    console.log(profielfoto
    )



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

    const errors = []

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

    const errors = []

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

