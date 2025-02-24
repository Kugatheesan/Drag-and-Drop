import { Request,Response } from "express";
import { getUser, getUsersInfo, saveUser, userEmailExists, userNameExists, getUserProfile, getUserByEmail, updateOTP , getUserByOTP, updatePassword} from "../repository/userRepository";
import { comparePasswords, hashPassword } from "../utils/utils";
import { CustomRequest, generateToken } from "../utils/auth";
import { sendEmail } from "../utils/mailer";
import crypto from "crypto";
import bcrypt from "bcrypt";
import { promises } from "readline";


    //Function to create a new user
    export async function createUser(req:Request, res: Response) {
        const { username,email,password } = req.body;

        //check user name exists
        const isuserNameExists = await userNameExists(username);

        //if user name exists return 400
        if(isuserNameExists) {
            res.status(400).send("name already exists");
            return;
        }

        //check  email exists
        const isuserEmailExists = await userEmailExists(email);

        //if  email exists return 400
        if(isuserEmailExists) {
            res.status(400).send("email already exists")
            return;
        }

        //hash password
        const hashedPassword = await hashPassword(password)

        //save user to database
        console.log(username, email, password)
        const savedUser = await saveUser(username,email,hashedPassword);
        res.status(201).send(savedUser)
    }

    //User Interface
    interface User{
        user_id:number;
        username: string;
        email: string;
        password: string;
    }

    //login page

    export async function signinuser(req:Request,res:Response){
        const {username:resUsername,password} = req.body;

        //get user from database
        const user:User = await getUser(resUsername);


        //if user not found return 400
        if(!user){
            res.status(400).send("User not Found");
            return;
        }

        //compare passwor
        const isPasswordCorrect = await comparePasswords(password,user.password);

        //if password is not correct return 400
        if(!isPasswordCorrect) {
            res.status(400).send("Password is incorrect");
            return;
        }

        //if password is correct return token
        const token= generateToken(user);
        const { user_id,username,email}= user;

         // Set token in HTTP-only cookie for better security
         res.cookie("auth_token", token, {
            httpOnly: true,
            secure: false,  // Keep false for local testing
            sameSite: "lax", // Change to "None" in production
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          });          

        res.status(200).send({user:{user_id,username,email}});
    }

    // Function to get user details
    export async function getUsers(req: Request, res: Response) {
        const users = await getUsersInfo();
        res.status(200).send(users.rows);
    }

    export async function getProfile(req: Request, res: Response) {
        const user_name = (req as CustomRequest).token.name;
        const userInfo = await getUserProfile(user_name)
        res.status(200).send(userInfo)
    }

    export const logout = async(req:Request,res:Response) =>{
        try{
          res.cookie('auth_token',null,{
            expires: new Date(Date.now()),
            httpOnly:true
          })
          res.status(200).send({ message:'logout Success'})
    
        }catch(error){
            res.status(500).send({ message:'logout failed'})
        }
      }

      export async function forgotPassword(req: Request, res: Response): Promise<any> {
        const { email } = req.body;
    
        // Get user by email
        const user = await getUserByEmail(email);
        if (!user) {
            return res.status(400).send("User not found");
        }
    
        // Generate reset token and expiry time (1 hour)
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
        
        // Save token in database
        await updateOTP(user.id, otp, otpExpiry);

        // Store token in HTTP-only cookie
        res.cookie("reset_token", otp, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Use HTTPS in production
            sameSite: "lax",
            expires: otpExpiry, //  FIXED: Pass Date object
        });
    
        // Send email with reset link
        const resetLink = otp;
        await sendEmail(email, "Password Reset", `Click here to reset your password: ${resetLink}`); //otp sent to email
    
        res.status(200).send("Password reset link sent to your email");
    }
    
    export async function verifyOTP(req: Request, res: Response): Promise<any> {
        const { otp } = req.body;
    
        if (!otp) {
            return res.status(400).send("OTP is required");
        }
    
        // Get user by OTP
        const user = await getUserByOTP(otp);
        console.log("User::", user)
        if (!user || user.otp_expiry < new Date()) {
            return res.status(400).send("Invalid or expired OTP");
        }
    
        res.status(200).send("OTP verified successfully");
    }
    
    
 export async function resetPassword(req: Request, res: Response):Promise<any> {
            const { otp, newPassword } = req.body;
        
            // Get user by token
            const user = await getUserByOTP(otp);
            console.log(user);
            if (!user || user.reset_token_expiry < Date.now()) {
                return res.status(400).send("Invalid or expired OTP");
            }
        
            // Hash new password
            const hashedPassword = await bcrypt.hash(newPassword, 10);
        
            // Update password and clear reset token
            await updatePassword(user.id, hashedPassword);

            // Clear OTP after verification
            await updateOTP(user.id, user.token,user.expiry);
        
            res.status(200).send("Password reset successful");
        }
   
        // export class AuthController {
        //     // google
        //     static async googleLogin(req: any, res: any) {
        //     try {
        //     const { token } = req.body;
        //     const ticket = await client.verifyIdToken({
        //     idToken: token,
        //     audience: process.env.GOOGLE_CLIENT_ID,
        //     });
        //     const payload = ticket.getPayload();
        //     if (!payload) {
        //     return res.status(400).json({ message: "Invalid Google token" });
        //     }
        //     console.log("Google User Info:", payload);
        //     const userResult = await pool.query(
        //     `SELECT * FROM public."users" WHERE email = $1`, [payload.email]
        //     );
        //     let user;
        //     if (userResult.rows.length === 0) {
        //     // Insert new user into PostgreSQL
        //     const insertQuery = `
        //     INSERT INTO public."users" (username, email, profileImage, role)
        //     VALUES ($1, $2, $3, $4) RETURNING *`;
        //     const insertResult = await pool.query(insertQuery, [
        //     payload.name, payload.email, payload.picture, "user"
        //     ]);
        //     user = insertResult.rows[0];
        //     } else {
        //     user = userResult.rows[0];
        //     }
        //     // Generate JWT
        //     const authToken = jwt.sign(
        //     { id: user.id, role: user.role },
        //     process.env.JWT_SECRET || "default_secret",
        //     { expiresIn: "1d" }
        //     );
        //     res.json({ token: authToken, user });
        //     } catch (error) {
        //     console.error("Google Authentication Error:", error);
        //     res.status(401).json({ message: "Google Authentication Failed" });
        //     }
        //     }
        //     }       