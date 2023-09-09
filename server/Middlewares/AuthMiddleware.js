const User = require("../models/user");
// require("dotenv").config();
const jwt = require("jsonwebtoken");



module.exports.userVerification = (req, res) => {
    const token = req.cookies.token
    console.log("The Token is ", token);
    if (!token) {
        return res.json({ status: false })
    }
    jwt.verify(token, process.env.FIRST_SECRET_KEY, async (err, data) => {
        // res.json({ "meee" : data })
        // console.log("The Data is ",data);
        if (err) {
            return res.json({ status: false })
        } else {
            console.log("Abu habib data is ", data);
            const user = await User.findById(data.id)
            // res.json({"user" : user})
            res.json({ status: true, user: user })
            // else return res.json({ status: false })
        }
    })
}