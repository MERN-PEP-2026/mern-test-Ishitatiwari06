import jwt from "jsonwebtoken";

const protect = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                res.status(401);
                throw new Error("Not authorized, token failed");
            }
            req.user = decoded;
            next();
        });
    } else {
        res.status(401);
        throw new Error("Not authorized, no token");
    }
};

export { protect };