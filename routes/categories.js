const router = require("express").Router();
const Category = require("../models/Category");

//category
router.get("/", async (req, res) => {
    try{
        const cats = await Category.find();
        res.status(200).json(cats);
    } catch (err) {
        res.status(500).json(err);
    }
});

//all categories
router.post("/", async (req, res) => {
    const newCat = new Category(req.body);
    try{
        const savedCat = await newCat.save();
        res.status(200).json(savedCat);
    } catch (err) {
        res.status(500).json(err);
    }
});


// //-------------------update-------------------
// router.put("/:id", async (req, res) => {
//     try {
//         const category = await Category.findById(req.params.id);
//         if(category.name === req.body.name){
//             try {
//                 const updatedCategory= await Category.findByIdAndUpdate(req.params.id, {
//                     $set: req.body,
//                 }, { new: true });
//                 res.status(200).json(updatedCategory);

//             } catch (err) {
//                 res.status(500).json(err)
//             }

//         } else {res.status(401).json("Select correct category!")};

//     } catch(err) {
//         res.status(500).json(err)
//     }   
// });




module.exports = router;