import jwt from 'jsonwebtoken'
const JWT_SECRET = process.env.JWT_SECRET


exports.authCheck = (req, res, next) => {
    const token = req.cookies.token;
    console.log(token);

    if (!token) {
        return res.status(401).json({ message: "Access denied" });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Invalid token" });
        }
        req.user = decoded;
        next();
    })
}