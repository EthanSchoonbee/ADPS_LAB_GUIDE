import jwt from "jsonwebtoken";

const checkauth = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token,"this_secret_should_be_longer_than_it_is");
        next(); //pass control to next handler
    } catch (e) {
        res.status(401).json({
            message: "Token invalid"
        });
    }
};

export default checkauth;