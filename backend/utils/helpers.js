require("dotenv").config();
const jwt = require("jsonwebtoken");

exports.getToken = async (email,user) => {
    const token = jwt.sign({ identifier: user._id }, process.env.JWT_SECRET);
    return token;
};
