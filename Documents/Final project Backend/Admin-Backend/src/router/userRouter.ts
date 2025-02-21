import express from 'express';
import { deleteUser, getAllUsers } from '../Controller/userController';

const router = express.Router();

// API to get all registered users
router.get('/users', getAllUsers);
router.delete('/users/:id', deleteUser); 

export default router;
