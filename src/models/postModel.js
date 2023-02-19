const mongoose = require('mongoose')
const userModel=require("./userModel")
const ObjectId= mongoose.Schema.Types.ObjectId

const commentSchema = new mongoose.Schema({
    content:{
        type: String,
        required: true,
        trim: true
    },
    commentedId:{
        type: ObjectId,
        ref:"postUser",
        //required: true,
        trim: true
    },
    date:{
        type: Date,
        default: Date.now
    },
    comments: {
        type: [this],
        trim: true
    }
},{timestamps:true})

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    userId: {
        type: ObjectId,
        ref:"postUser",
        required: true
    },
   
    date: {
        type: Date,
        default: Date.now
    },
    isDeleted:{
   type:Boolean,
   default:false
    },
    comments: [commentSchema]

},{timestamps:true});

module.exports = mongoose.model('Post', postSchema);
module.exports = mongoose.model('Comment', commentSchema);