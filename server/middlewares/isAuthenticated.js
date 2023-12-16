const jwt = require("jsonwebtoken");
const config = require("../config");

const isAuthenticated = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];

    if (token) {
        try {
            const decoded = jwt.verify(token, config.SECRET_KEY);

            req.userId = decoded.userId;

            next();
        } catch (err) {
            res.status(403).json({ message: "Not authenticated" })
        }
    } else {
        return res.status(401).json({ message: "Not authenticated" });
    }
};

module.exports = isAuthenticated;