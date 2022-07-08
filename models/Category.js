const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
}, {timestamps: false}
);

module.exports = mongoose.model("Category", CategorySchema);