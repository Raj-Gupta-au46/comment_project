const express= require("express")
const router= express.Router()
const {createUser,loginUser}=require('../controllers/userController')
const {createPost,getPost,updatePost,deletePost,postComment,nestedComments}=require('../controllers/postController')


//=============================user APi's================================//
router.post("/createUser",createUser)
router.post("/login",loginUser)

//===============================post Api's==================================//
router.post("/createPost/:userId",createPost)
router.get("/getPost/:userId",getPost)
router.put("/updatePost/:userId",updatePost)
router.delete("/deletePost/:userId",deletePost)

//===============================comments Api's==================================//
router.post("/addComments/:userId",postComment)
router.post("/addNestedComments/:userId",nestedComments)

router.all("/*" ,async function(req,res){
   try{
    return res.status(400).send({status:false,message:"invalid api request"})
   }
   catch(error){
    return res.status(500).send({status:false,message:error.message})
   }
})


module.exports= router