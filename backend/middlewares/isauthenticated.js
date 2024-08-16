import jwt from "jsonwebtoken";
import { login } from "../controllers/user.controller.js";

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message: "User not Authenticated",
                success: false
            });
        }
        // agar token hai to  verify kro use
        const decode = await jwt.verify(token, process.env.SECRET_KEY);
        if (!decode) {
            return res.status(401).json({
                message: "Invalid Token",
                success: false
            });
        };
        req.id = decode.userId;
        next();

    } catch (error) {
        console.log(error);

    }
}
export default isAuthenticated;