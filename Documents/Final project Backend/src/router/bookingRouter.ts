import { Router } from "express";
import { getAllBookings, createBooking, getBookingById ,editBooking ,deleteBooking} from "../conrollers/bookingController";

const router = Router();

router.get('/book', getAllBookings);
router.post('/create', createBooking);
router.get('/bookings', getBookingById);
router.put('/editbooking',editBooking);
router.delete('/deletebooking',deleteBooking);



export default router;
