"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticationToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function isJwtPayload(decoded) {
    return typeof decoded === 'object' && decoded != null && 'sub' in decoded;
}
const authenticationToken = (req, res, next) => {
    //* Extract token from Authorization header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    //* Check if token exists
    if (!token) {
        return res.status(401).json({ message: "Access token missing" });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        if (!isJwtPayload(decoded)) {
            return res.status(403).json({ message: "Invalid token structure" });
        }
        req.userId = decoded.sub;
        next();
    }
    catch (error) {
        return res.status(403).json({ message: "Invalid token or expired" });
    }
};
exports.authenticationToken = authenticationToken;
