const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const bcryptjs = require('bcryptjs');
 

//update
router.put("/:id", async (req, res) => {
    if(req.body.userId === req.params.id) {
        if(req.body.password){
            const salt = await bcryptjs.genSalt(10);
            req.body.password = await bcryptjs.hash(req.body.password, salt);
        }
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            }, {new:true}); //update mongoose
            res.status(200).json(updatedUser);

        }   catch(err) {
            res.status(500).json(err);
        }
    } else {
        res.status(401).json("You can delete only update your account!");
    }
});


//delete
router.delete("/:id", async (req, res) => {
    if(req.body.userId === req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            try {
                await Post.deleteMany({ username: user.username }); // delete user's posts (all)
                await User.findByIdAndDelete(req.params.id); //delete user by id
                res.status(200).json("User has been deleted!");
            } catch(err) {
              res.status(500).json(err);
            }
        }   catch(err) {
            res.status(404).json("User not found!");
        }
    } else {
        res.status(401).json("You can delete only your account!");
    }
});

//get user
router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const {password, ...others} = user._doc;
        res.status(200).json(others);   

    } catch (err) {
        res.status(500).json(err);
    }

})


module.exports = router;