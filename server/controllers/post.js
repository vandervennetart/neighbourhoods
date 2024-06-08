import { pool } from "../db.js";

export const getProfielFoto = async (req, res) => {
    const Postid = +req.params.id;
    const query = "select profielfoto from profielen where id = ?"

    try{
        const values = [Postid]
        const [results] = await pool.execute(query, values)

        const file = results[0];

        res.setHeader('Content-Disposition', `attachment; filename="${file.name}"`);
        res.setHeader('Content-Type', 'application/octet-stream');
        res.status(200).send(file.profielfoto);



    }catch (error) {
        console.error("Error loggin in user:", error);
        return res.status(500).json({
            status: "error",
            data: {error : "Internal Server Error"}
        });
    }




}

export const getAllPosts = async (req, res) => {
    let activityQuery = "SELECT * from activiteiten"
    if (!req.query.sort === "null"){
        activityQuery += " ORDER BY " + req.query.sort ;
    }


    const participantQuery = `select id, naam, profielfoto from profielen_has_activiteiten
inner join profielen on Profielen_id = Profielen.id
where activiteiten_id = ?;`;

    try {
        const [activiteiten] = await pool.execute(activityQuery);
        const activiteit = activiteiten;

        for await (const e of activiteit) {
            const [deelnemers] = await pool.execute(participantQuery, [e.id]);
            e.deelnemers = deelnemers;
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


        res.status(200).json(activiteit);
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({
            status: "error",
            message: "Internal Server Error",
        });
    }
};

export const getAllOrganised = async (req, res) => {
    const id = +req.params.id;
    const activityQuery = `select activiteiten.* from activiteiten
inner join profielen on profielen.id = organisator_id
where profielen.id = ?;`;

    const participantQuery = `select id, naam, profielfoto from profielen_has_activiteiten
inner join profielen on Profielen_id = Profielen.id
where activiteiten_id = ?;`;

    try {
        const [activiteiten] = await pool.execute(activityQuery, [id]);
        const activiteit = activiteiten;

        for await (const e of activiteit) {
            const [deelnemers] = await pool.execute(participantQuery, [e.id]);
            e.deelnemers = deelnemers;
        }

        console.log(activiteit);
        res.status(200).json(activiteit);
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({
            status: "error",
            message: "Internal Server Error",
        });
    }
};

export const getAllParticipant = async (req, res) => {
    const id = +req.params.id;
    const activityQuery = `select activiteiten.* from profielen_has_activiteiten
inner join activiteiten on activiteiten_id = activiteiten.id
where Profielen_id = ?`;
    const participantQuery = `select naam, profielfoto from profielen_has_activiteiten
inner join profielen on Profielen_id = Profielen.id
where activiteiten_id = ?;`;
    try {
        const [activiteiten] = await pool.execute(activityQuery, [id]);
        const activiteit = activiteiten;

        for await (const e of activiteit) {
            const [deelnemers] = await pool.execute(participantQuery, [e.id]);
            e.deelnemers = deelnemers;
        }

        console.log(activiteit);
        res.status(200).json(activiteit);
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({
            status: "error",
            message: "Internal Server Error",
        });
    }
};


export const createPost = async (req, res) => {

};