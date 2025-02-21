import express from 'express';
import { deleteBooking, getAllBookings } from '../Controller/bookingController';

const bookRouter = express.Router();

bookRouter.get('/book',getAllBookings)
bookRouter.delete('/bookdelete/:id',deleteBooking)

export default bookRouter;
