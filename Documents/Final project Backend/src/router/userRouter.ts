import { Router } from "express";
import { createUser, signinuser, getProfile, logout, forgotPassword, resetPassword, verifyOTP } from "../conrollers/userController";
import { auth } from "../utils/auth";

const router=Router();

router.post('/register',createUser);
router.post('/login',signinuser);
router.get('/profile', auth, getProfile)
router.post('/logout', logout)
router.post('/forgot-password',forgotPassword)
router.post('/reset-password',resetPassword)
router.post('/verify-otp',verifyOTP)

export default router;