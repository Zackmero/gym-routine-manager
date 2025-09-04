import jwt from "jsonwebtoken";
function isJwtPayload(decoded) {
    return typeof decoded === 'object' && decoded != null && 'sub' in decoded;
}
export const authenticationToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        res.status(401).json({ message: "Access token missing" });
        return;
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (typeof decoded === 'object' && decoded && 'sub' in decoded) {
            req.userId = decoded.sub;
            next();
        }
        else {
            res.status(403).json({ message: "Invalid token structure" });
            return;
        }
    }
    catch (error) {
        res.status(403).json({ message: "Invalid token or expired" });
        return;
    }
};
