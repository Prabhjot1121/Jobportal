import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// user ko register krwana ka logic
export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;//form m jo values hongi unhe lega 
        // agar koi required value miss h to neche wala code chalega aur error dega
        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "something is missing",
                success: false
            });
        };
        // user ko find krega email ke basis pr.... kya email pehle use to nhi hui 
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: "sorry email already used",
                success: false
            });
        };
        // password ko hash kre ge bcrypt se jo cheeg hash krni hai vo bracket m pehle aur kitni 1-12 ki range m 
        const hashedPassword = await bcrypt.hash(password, 10);
        // user create hoga jo jo value di h vo db m save ho jae gi
        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role
        })

        return res.status(201).json({
            message: "user created successfully",
            success: true
        })
    } catch (error) {
        console.log(error)
    }
}
// user login ka logic
export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "something is missing",
                success: false
            });
        };
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Invalid email or password",
                success: false
            });
        };
        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if (!isPasswordMatched) {
            return res.status(400).json({
                message: "Invalid email or password",
                success: false
            });
        }
        if (role !== user.role) {
            return res.status(400).json({
                message: "Account doesn't exist with same role",
                success: false
            });
        };
        const tokenData = {
            userId: user._id
        }
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: "2d" });

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            password: user.password,
            role: user.role,
            profile: user.profile
        }
        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: "strict" }).json({
            message: `welcome back ${user.fullname}`,
            user,
            success: true
        });

    } catch (error) {
        console.log(error)
    }

}
// logout fxnality
export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logout successful",
            success: true
        })
    } catch (error) {
        console.log(error);

    }
}
// update profile jisme skill vgera add krni h
export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;
        const file = req.file;

        // Assuming you'll handle file uploads (e.g., to Cloudinary) here
        // ...

        let skillsArray;
        if (skills) {
            skillsArray = skills.split(",");
        }

        const userId = req.id;
        let user = await User.findById(userId);

        if (!user) {
            return res.status(401).json({
                message: "User not found",
                success: false
            });
        }

        // Updating user data
        if (fullname) user.fullname = fullname;
        if (email) user.email = email;
        if (phoneNumber) user.phoneNumber = phoneNumber;
        if (bio) user.profile.bio = bio;
        if (skillsArray) user.profile.skills = skillsArray;

        // Additional logic to handle profile photo and resume uploads can be added here

        await user.save();

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            password: user.password,
            role: user.role,
            profile: user.profile
        };

        return res.status(200).json({
            message: "User updated successfully",
            user,
            success: true
        });


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};
