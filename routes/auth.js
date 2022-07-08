const router = require("express").Router();
const bcryptjs = require('bcryptjs');
const User = require("../models/User");

//Register
router.post("/register", async (req, res) => {
    try {
        //encrypt password with bcypt
        const salt = await bcryptjs.genSalt(10);
        const hashedPass = await bcryptjs.hash(req.body.password, salt)
        //----------------------------
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass,
        })
        const user = await newUser.save();
        res.status(200).json(user);

    }   catch(err) {
        res.status(500).json(err);
    }
});

//Login
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({username: req.body.username});
        !user && res.status(400).json("Wrong username!")

        const validated = await bcryptjs.compare(req.body.password, user.password);
        !validated && res.status(400).json("Wrong password!")

        const { password, ...others } = user._doc; //sends to user data except password
        res.status(200).json(others) //others

    }   catch(err) {
        res.status(500).json(err);
    }
});


module.exports = router;