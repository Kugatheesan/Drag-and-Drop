import pool from "../database";
import { Request, Response } from 'express';

//Get booking
export const getAllBookings = async (req:Request, res:Response) => {
    try {
        const result = await pool.query(`
            SELECT 
                b.id, 
                b.username, 
                b.telephone_number, 
                b.event_date,
                s.name AS service_name, 
                c.name AS category_name
            FROM bookings b
            JOIN categories c ON CAST(b.category_id AS INTEGER) = c.id
            JOIN services s ON c.service_id = s.id
        `);
        
      res.json(result.rows);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

 // Delete  booking
export const deleteBooking = async (req:Request, res:Response) => {
    const { id } = req.params;
    try {
      await pool.query("DELETE FROM bookings WHERE id = $1", [id]);
      res.json({ message: "Booking deleted successfully" });
    } catch (error) {
      console.error("Error deleting booking:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  