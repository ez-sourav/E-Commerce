import User from "../model/user.model.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

export const registerUserController = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All field required."
            })
        }

        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({
                success: false,
                message: "User already exists."
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        })

        return res.status(201).json({
            success: true,
            message: "User regiterted successfully.",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const loginUserController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All field required."
            })
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials."
            })
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials."
            })
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "2d" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: 'strict',
            maxAge: 2 * 24 * 60 * 60 * 1000
        }).status(200).json({
            success: true,
            message: "Login successful"
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
    
}

export const logoutUserController = (req,res)=>{
    res.clearCookie('token',{
        httpOnly:true,
        secure: process.env.NODE_ENV === "production",
        sameSite: 'strict'
    })
    return res.status(200).json({
        success:true,
        message:"User logged out successfully."
    })
}