import { pool } from "../db.js";

export const getAllPosts = async (req, res) => {
    const activityQuery = "SELECT * from activiteiten";
    const participantQuery = `select naam, profielfoto from profielen_has_activiteiten
inner join profielen on Profielen_id = Profielen.id
where activiteiten_id = ?;`;

    try {
        const [activiteiten] = await pool.execute(activityQuery);
        const activiteit = activiteiten;

        for await (const e of activiteit){
            const [deelnemers] = await pool.execute(participantQuery, [e.id]);
            e.deelnemers = deelnemers;
        }
        
        console.log(activiteit)
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
    const { naam, beschrijving, prijs, plaats, datum, maxMensen } = req.body;
    // Create a new user in the database
    // Always use a prepared statement!
    const query =
        "INSERT INTO activiteiten (naam, beschrijving, prijs, plaats, datum, maxMensen) VALUES (?, ?, ?, ?, ?)";
    const values = [naam, beschrijving, prijs, plaats, datum, maxMensen];

    try {
        const [result] = await pool.execute(query, values);
        // Correct StatusCode
        // JSend syntax!
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
};

export const getPost = async (req, res) => {
    const id = +req.params.id;
    const activityQuery = "SELECT * from activiteiten where id = ?";
    const participantQuery = `select naam, profielfoto from profielen_has_activiteiten
inner join profielen on Profielen_id = Profielen.id
where activiteiten_id = ?;`;

    try {
        const values = [id];
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
    const query = `select activiteiten.* from activiteiten
inner join profielen on profielen.id = organisator_id
where profielen.id = ?;`;
    try {
        const values = [id];
        const [result] = await pool.execute(query, values);
        res.status(200).json(result);
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
    const query = `select activiteiten.* from profielen_has_activiteiten
inner join activiteiten on activiteiten_id = activiteiten.id
where Profielen_id = ?`;
    try {
        const values = [id];
        const [result] = await pool.execute(query, values);
        res.status(200).json(result);
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({
            status: "error",
            message: "Internal Server Error",
        });
    }
};