import pool from "../database";
import { Request, Response } from 'express';

//getAllService
export const getAllService = async (req: Request, res: Response): Promise<any> => {
    try {
        // Fetching categories with service_id from the categories table
        const result = await pool.query("SELECT * FROM services ORDER BY id DESC");

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "No services found." });
        }

        return res.status(200).json(result.rows);
    } catch (error) {
        console.error("Error fetching services", error);
        return res.status(500).json({ message: "Server error" });
    }
};

//getAllCtegories
export const getAllCategories = async (req: Request, res: Response): Promise<any> => {
    try {
        // Fetching categories with service_id from the categories table
        const result = await pool.query("SELECT * FROM categories ORDER BY id DESC");

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "No categories found." });
        }

        return res.status(200).json(result.rows);
    } catch (error) {
        console.error("Error fetching categories:", error);
        return res.status(500).json({ message: "Server error" });
    }
};

//add service
export const addService = async (req: Request, res: Response): Promise<any> => {
    const { name } = req.body; // No need for id

    try {
        const result = await pool.query(
            "INSERT INTO services (name) VALUES ($1) RETURNING *",
            [name]
        );

        return res.status(201).json({ message: "Service added successfully", service: result.rows[0] });
    } catch (error) {
        console.error("Error adding service:", error);
        return res.status(500).json({ message: "Server error" });
    }
};

//addcategory
export const addCategory = async (req: Request, res: Response): Promise<any> => {
    const { service_id, name, description } = req.body; // No need for id

    try {
        const result = await pool.query(
            "INSERT INTO categories (service_id, name, description) VALUES ($1, $2, $3) RETURNING *",
            [service_id, name, description]
        );

        return res.status(201).json({ message: "Category added successfully", category: result.rows[0] });
    } catch (error) {
        console.error("Error adding category:", error);
        return res.status(500).json({ message: "Server error" });
    }
};



//delete category by ID
export const deleteCategory = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params; // URL-ல் இருந்து Category ID-ஐ எடுக்கின்றோம்

    try {
        // Delete category where category id matches
        const result = await pool.query("DELETE FROM categories WHERE id = $1 RETURNING *", [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ message: "Category not found." });
        }

        return res.status(200).json({ message: "Category deleted successfully." });
    } catch (error) {
        console.error("Error deleting category:", error);
        return res.status(500).json({ message: "Server error" });
    }
};

//delete service by ID
export const deleteService = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params; // URL-ல் இருந்து Service ID-ஐ எடுக்கின்றோம்

    try {
        // Delete the service from the services table
        const result = await pool.query("DELETE FROM services WHERE id = $1 RETURNING *", [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ message: "Service not found." });
        }

        return res.status(200).json({ message: "Service deleted successfully." });
    } catch (error) {
        console.error("Error deleting service:", error);
        return res.status(500).json({ message: "Server error" });
    }
};

