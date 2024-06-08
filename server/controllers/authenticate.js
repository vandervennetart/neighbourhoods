import {pool} from "../db.js";
import {generateAccessToken, generateRefreshToken, refreshTokenSecret} from "../middelware/authenticateValidation.js";
import bcrypt from "bcrypt"
import  jwt from "jsonwebtoken"


const {verify} = jwt



export const login = async (req, res) => {

    const email = req.body.email
    const ww = req.body.wachtwoord

    const getLoginDetailsQuery = "SELECT * from profielen where email = ?";
    const insertRefreshTokenQuery = "UPDATE profielen SET refresh_token = ? WHERE id = ?"


    try {
        const [gegevens] = await pool.execute(getLoginDetailsQuery, [req.body.email]);


        if (gegevens?.length > 0){
            const id = gegevens[0].id;
            const storedEmail = gegevens[0].email;
            const storedPassword = gegevens[0].wachtwoord;



            bcrypt.compare(ww, storedPassword, async function (err, result) {
                if (storedEmail === email && result) {

                    const refreshToken = generateRefreshToken({id: id});
                    const accessToken = generateAccessToken({id: id})


                    const values = [refreshToken, id]
                    await pool.execute(insertRefreshTokenQuery, values)




                    res.cookie('refreshToken', refreshToken, {
                        httpOnly: true,
                        secure: true,
                    })

                    res.status(201).json({
                        status: "success",
                        data: {
                            accessToken: accessToken
                        }
                    });
                } else {
                    res.status(200).json({
                        status: "failed",
                        message: [{name: "email", message: "email of wachtwoord is fout"}],
                    });
                }

            })
        }else{
            res.status(200).json({
                status: "failed",
                message: [{name: "email" ,message: "email of wachtwoord is fout"}],
            });
        }




    } catch (error) {
        console.error("Error loggin in user:", error);
        return res.status(500).json({
            status: "error",
            data: {error : "Internal Server Error"}
        });
    }
}

export const logout = async (req, res) =>{
    const refreshToken = req.cookies.refreshToken;
    const delRefreshQuery = "update profielen set refresh_token = null where refresh_token=?"

    try{
        const values = [refreshToken]
        await pool.execute(delRefreshQuery, values)

        res.status(201).json({
            status: "success",

        });


    } catch (error) {
        console.error("Error sign out:", error);
        return res.status(500).json({
            status: "error",
            message: "Internal Server Error",
        });
    }

}

export const register = async (req, res) => {
    const {naam, email, tel ,wachtwoord} = req.body
    const insertQuery = "insert into profielen (naam, email, telefoonnummer, wachtwoord)\n" +
        "values (?,?,?,?);";
    const insertRefreshTokenQuery = "UPDATE profielen SET refresh_token = ? WHERE id = ?"

    const selectQuery = "select id from profielen where email = ?"

    try {

        let values = [email]

        const [alreadyIn] = await pool.execute(selectQuery, values);


        bcrypt.hash(wachtwoord, 10, async (error, hash) => {
            if (!error && alreadyIn.length === 0){


                values = [naam, email, tel ,hash]
                const [result] = await pool.execute(insertQuery, values);


                const id = result.insertId

                const refreshToken = generateRefreshToken({id: id});
                const accessToken = generateAccessToken({id: id})


                values = [refreshToken, id]
                await pool.execute(insertRefreshTokenQuery, values)




                res.cookie('refreshToken', refreshToken, {
                    httpOnly: true,
                    secure: true,
                })

                res.status(201).json({
                    status: "success",
                    data: {
                        accessToken: accessToken
                    }
                });
            } else {
                res.status(200).json({
                    status: "failed",
                    message: [{name: "email", message: "email is al in gebruik"}],
                });
            }




        })




    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({
            status: "error",
            message: "Internal Server Error",
        });
    }
}

export const getProfielData = async (req, res) => {
    const query = "select id, naam, email, telefoonnummer from profielen where id = ?"

    try{
        const values = [req.id.id.id]
        const [response] = await pool.execute(query, values)



        console.log(response)
        res.status(200).json(response);

    }catch (error) {
        console.error("Error loggin in user:", error);
        return res.status(500).json({
            status: "error",
            data: {error : "Internal Server Error"}
        });
    }




}

export const getNewAccessToken = (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (refreshToken == null) return res.sendStatus(401);

    const tokenInRefreshtokens = "select profielen.refresh_token from profielen where id = ?"

    try{


        jwt.verify(refreshToken, refreshTokenSecret, async (err, id) => {
            if (err) {
                const delRefreshToken = "update profielen set refresh_token = null where refresh_token = ?;"
                const value = [refreshToken]

                await pool.execute(delRefreshToken, value)

                res.status(403)
            }


            const values = [id.id.id]
            const [response] = await pool.execute(tokenInRefreshtokens, values)

            if (response[0]){
                const accessToken = generateAccessToken({id: values[0]});

                res.status(201).json({
                    status: "success",
                    data: {
                        accessToken: accessToken
                    }
                });
            }else{
                res.status(403)
            }


        });
    }catch (error) {
        console.error("Error getting new acces token:", error);
        return res.status(500).json({
            status: "error",
            data: {error : "Internal Server Error"}
        });
    }


}


export const updateProfiel = async (req, res) => {

    let query;
    let profielfoto;
    if (req.body.payload.profielfoto){
        profielfoto = Buffer.from(new Uint8Array(req.body.payload.profielfoto));
        query = "UPDATE profielen set naam = ?, email = ?, telefoonnummer = ?, profielfoto = ? where id = ?;"
    }else{
        query = "UPDATE profielen set naam = ?, email = ?, telefoonnummer = ? where id = ?;"
    }





    const {naam, email, telefoonnummer} = req.body.payload

    const id = req.id.id.id



    const selectQuery = "select id from profielen where email = ? and id != ?"

    try{

        let values = [email, id]

        const [alreadyIn] = await pool.execute(selectQuery, values);

        if (alreadyIn.length === 0){

            if(profielfoto){
                console.log("B")
                values = [naam, email, telefoonnummer, profielfoto, id]
            }else{
                values = [naam, email, telefoonnummer, id]
            }

            console.log(query)

            const [response] = await pool.execute(query, values)

            res.status(200).json(response);
        }else{
            res.status(200).json({
                status: "failed",
                message: [{name: "email", message: "email is al in gebruik"}],
            });
        }




    }catch (error) {
        console.error("Error loggin in user:", error);
        return res.status(500).json({
            status: "error",
            data: {error : "Internal Server Error"}
        });
    }
}

export const inschrijven = async (req, res) => {
    const activiteitId = +req.params.id;

    const selectQuery = "select * from profielen_has_activiteiten where Profielen_id = ? and activiteiten_id = ?;"

    const delQuery = "delete from profielen_has_activiteiten where Profielen_id = ? and activiteiten_id = ?;"

    const insertQuery = "insert into profielen_has_activiteiten (Profielen_id, activiteiten_id) values (?,?);"

    let response;

    try {
        const values = [req.id.id.id,activiteitId]

        const [alreadyIn] = await pool.execute(selectQuery, values)

        if (alreadyIn.length > 0){
            [response] = await pool.execute(delQuery, values)
        }else{
            [response] = await pool.execute(insertQuery, values)
        }



        res.status(200).json(response);

    } catch (error) {
        console.error("Error loggin in user:", error);
        return res.status(500).json({
            status: "error",
            data: {error: "Internal Server Error"}
        });
    }
}

export const getPost = async (req, res) => {
    const Postid = +req.params.id;
    const activityQuery = "SELECT * from activiteiten where id = ?";
    const participantQuery = `select id, naam, profielfoto from profielen_has_activiteiten
inner join profielen on Profielen_id = Profielen.id
where activiteiten_id = ?;`;

    try {
        const values = [Postid];
        const [activiteiten] = await pool.execute(activityQuery, values);
        const activiteit = activiteiten[0];

        const [deelnemers] = await pool.execute(participantQuery, [
            activiteit.id,
        ]);
        activiteit.deelnemers = deelnemers;


        if (req.id.id.id){
            const ingeschrevenQuery = "select * from profielen_has_activiteiten where Profielen_id = ? and activiteiten_id = ?"

            const values = [req.id.id.id, Postid]
            const [resp] = await pool.execute(ingeschrevenQuery, values)

            if (resp.length > 0){
                activiteit.ingeschreven = true
            }
        }

        res.status(200).json(activiteit);
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({
            status: "error",
            message: "Internal Server Error",
        });
    }
};

export const makePost = async (req, res) =>{
    const organisator_id = req.id.id.id
    const {naam, beschrijving, prijs, plaats, datum, maxMensen} = req.body.payload

    // console.log(req)

    const query = "insert into activiteiten (naam, beschrijving, prijs, plaats, datum, maxMensen, organisator_id) values (?,?,?,?,?,?,?);"

    try {
        console.log(naam, beschrijving, prijs, plaats, datum, maxMensen, organisator_id)
        const values = [naam, beschrijving, prijs, plaats, datum, maxMensen, organisator_id];
        const [result] = await pool.execute(query, values);


        res.status(201).json({
            status: "success",
            data: { id: result.insertId },
        });
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({
            status: "error",
            message: "Internal Server Error",
        });
    }
}