import { Request, Response } from 'express';
import pool from '../database'; // Database connection import

//get user
export const getAllUsers = async (req: Request, res: Response):Promise<any> => {
    try {
        const result = await pool.query("SELECT id, username, email FROM users ORDER BY id DESC");
        
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "No users found." });
        }

        return res.status(200).json(result.rows);
    } catch (error) {
        console.error("Error fetching users:", error);
        return res.status(500).json({ message: "Server error" });
    }
};

//delete user
export const deleteUser = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;

        // Check if user exists
        const userCheck = await pool.query("SELECT * FROM users WHERE id = $1", [id]);

        if (userCheck.rows.length === 0) {
            return res.status(404).json({ message: "User not found." });
        }

        // Delete user from database
        await pool.query("DELETE FROM users WHERE id = $1", [id]);

        return res.status(200).json({ message: "User deleted successfully." });
    } catch (error) {
        console.error("Error deleting user:", error);
        return res.status(500).json({ message: "Server error" });
    }
};