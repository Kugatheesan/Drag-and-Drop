import { Request, response, Response } from "express";
import { pool } from "../database";
import { CustomRequest } from "../utils/auth";

// Get all bookings
export const getAllBookings = async (req: Request, res: Response):Promise<any> => {
    try {
        const result = await pool.query("SELECT * FROM bookings ORDER BY event_date DESC");

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "No bookings found." });
        }

        return res.status(200).json(result.rows);
    } catch (error) {
        console.error("Error fetching bookings:", error);
        return res.status(500).json({ message: "Server error" });
    }
};

// Create a new booking
export const createBooking = async (req: Request, res: Response): Promise<any> => {
    try {

        const user_name = (req as CustomRequest).token.name;
        console.log(user_name)

        const { username, telephone_number, service_id, category_id, event_date } = req.body;

        if (!username || !telephone_number || !service_id || !category_id || !event_date) {
            return res.status(400).json({ message: "All fields are required." });
        }

        // Database query
        const result = await pool.query(
            "INSERT INTO bookings (username, telephone_number, service_id, category_id, event_date) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [username, telephone_number, service_id, category_id, event_date]
        );

        return res.status(201).json({
            message: "Booking created successfully",
            booking: result.rows[0]
        });

    } catch (error) {
        console.error("Error creating booking:", error);
        return res.status(500).json({ message: "Server error" });
    }
};


// Get a single booking by ID
export const getBookingById = async (req: Request, res: Response) :Promise<any>=> {
    try {
        const { id } = req.params;
        const result = await pool.query("SELECT * FROM bookings WHERE id = $1::INTEGER", [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Booking not found" });
        }

        return res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error("Error fetching booking:", error);
        return res.status(500).json({ message: "Server error" });
    }
};

// Edit a booking
export const editBooking = async (req: Request, res: Response) :Promise<any>=> {
    try {
        const { id } = req.params;
        const { username, telephone_number, event_category, event_date, event_type } = req.body;

        if (!username || !telephone_number || !event_category || !event_date || !event_type) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const bookingCheck = await pool.query("SELECT id FROM bookings WHERE id = $1::INTEGER", [id]);
        if (bookingCheck.rows.length === 0) {
            return res.status(404).json({ message: `Booking with ID ${id} not found.` });
        }

        const result = await pool.query(
            "UPDATE bookings SET username = $1, telephone_number = $2, event_category = $3, event_date = $4, event_type = $5 WHERE id = $6 RETURNING *",
            [username, telephone_number, event_category, event_date, event_type, id]
        );

        return res.status(200).json({ message: "Booking updated successfully", booking: result.rows[0] });
    } catch (error) {
        console.error("Error updating booking:", error);
        return res.status(500).json({ message: "Server error" });
    }
};

// Delete a booking
export const deleteBooking = async (req: Request, res: Response) :Promise<any>=> {
    try {
        const { id } = req.params;

        const bookingCheck = await pool.query("SELECT id FROM bookings WHERE id = $1::INTEGER", [id]);
        if (bookingCheck.rows.length === 0) {
            return res.status(404).json({ message: `Booking with ID ${id} not found.` });
        }

        await pool.query("DELETE FROM bookings WHERE id = $1::INTEGER", [id]);

        return res.status(200).json({ message: "Booking deleted successfully." });
    } catch (error) {
        console.error("Error deleting booking:", error);
        return res.status(500).json({ message: "Server error" });
    }
};
