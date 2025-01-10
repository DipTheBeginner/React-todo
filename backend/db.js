const mongoose=require("mongoose");

mongoose.connect("mongodb+srv://devXvector:y6k2wTmaxqMbyAYa@cluster0.q7sua.mongodb.net/");

const todoSchema=mongoose.Schema({
    title:String,
    description:String,
    Completed:Boolean
})

const todo=mongoose.model('todos',todoSchema);
module.exports={
    todo
}