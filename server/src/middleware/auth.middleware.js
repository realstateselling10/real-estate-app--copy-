import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const protectRoute = async (req, res, next) => {
    try {
        let token;
        
        // Check cookies first
        if (req.cookies.jwtCookie) {
            token = req.cookies.jwtCookie;
        }
        // Then check Authorization header
        else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({ error: "You must be logged in" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded) {
            return res.status(401).json({ error: "You must be logged in" });
        }

        const user = await User.findById(decoded.userId).select("-password");
        if(!user) {
            return res.status(401).json({ error: "User not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("Error in protectRoute middleware", error.message);
        res.status(500).json({ error: "Internal Server" });
    }
};



export const adminOnly = (req, res, next) => {
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Access denied. Admins only." });
    }
    next();
  };
