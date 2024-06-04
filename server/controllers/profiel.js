import { pool } from "../db.js";

export const getAllProfiles = async (req, res) => {
    const query = "SELECT id, naam, profielfoto from profielen";
    try {
        const [result] = await pool.execute(query);
        res.status(200).json(result);
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({
            status: "error",
            message: "Internal Server Error",
        });
    }
};

export const createProfile = async (req, res) => {
    const { naam, email, telefoonnummer, wachtwoord, profielfoto } = req.body;
    // Create a new user in the database
    // Always use a prepared statement!
    const query =
        "INSERT INTO profielen (naam, email, telefoonnummer, wachtwoord, profielfoto) VALUES (?, ?, ?, ?, ?)";
    const values = [naam, email, telefoonnummer, wachtwoord, profielfoto];

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

export const getProfile = async (req, res) => {
    const id = +req.params.id;
    const query = "SELECT * from profielen WHERE id = ?";
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
