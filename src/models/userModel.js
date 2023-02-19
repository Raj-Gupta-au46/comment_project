const mongoose=require('mongoose')

const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    age:{
        type:String,
        required:true
    },
    Phone:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    password:{
       type:String,
       required:true,
       trim:true
    }
},{timestamps:true})
 module.exports=mongoose.model("postUser",userSchema)