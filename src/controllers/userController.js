const userModel=require('../models/userModel')
const postModel=require('../models/postModel')
const jwt=require("jsonwebtoken")
const {isValidString,isValidPhone,isValidEmail,isValidPswd }= require("../validation/validatiors")

const createUser= async function(req,res){
   try{
    const data = req.body;
    if(Object.keys(data).length==0)return res.status(400).send({status:false,msg:"can't create data with empty body"})
   // if(files.length==0)return res.status(400).send({status:false,msg:"profile image is manndatory"})
   let newArr=["name","email","Phone","password"]
   for(i of newArr){
    if(!data[i])return res.status(400).send({status:false,msg:` ${i} is mandatory please input ${i}`})
   }
   let array=Object.keys(data)
   for(i of array){
    if(data[i]=="")return res.status(400).send({status:false,msg:` ${i} can't be empty`})
   }
   if(isValidString( data.name.trim()))return res.status(400).send({status:false,msg:"please enter a valid fname"})
   

   if(!isValidEmail(data.email))return res.status(400).send({status:false,msg:"please enter a valid email"})
   if(!isValidPhone(data.Phone))return res.status(400).send({status:false,msg:"please enter a valid phone No"})

   if(!isValidPswd(data.password))return res.status(400).send({status:false,msg:"please enter a valid password"})
    const post=await userModel.create(data)
    return res.status(201).send({status:true,data:post});
   }
   catch(error){
    return res.status(500).send({status:false,msg:error.message})
   }
  }
  const loginUser= async function(req,res){
   try {
       let data= req.body
let  {email,password,Phone}=data
   if(Object.keys(req.body).length==0){
       return res.status(400).send({status:false,message:"can not login without credentials"})
   }
   if (data.hasOwnProperty("email") && data.hasOwnProperty("phone") ) {return res.status(400).send({ status: false, message: "please provide any one between email and phone no" })}
   if (!data.hasOwnProperty("email")) {
   if (!data.hasOwnProperty("Phone")) {return res.status(400).send({status: false,message: "please enter mobile no or email id to login"})}}
   if (!data.hasOwnProperty("password")) {return res.status(400).send({ status: false, message: "please enter password to login" })}

 
  if(email){
   if(!isValidEmail(email)){return res.status(400).send({status:false,message:"Email is invalid"})}}
  
if(Phone){
   if(!isValidPhone(Phone))return res.status(400).send({status:false,msg:"please enter a valid phone No"})
}
   let findUser= await userModel.findOne({$or: [{ email: data.email },{ phone: data.phone}]})
   if(!findUser){return res.status(404).send({status:false,message:"User not found"})}
 
  let token= jwt.sign({userId:findUser._id},"Project5",{expiresIn:"10d"})
  let obj= {userId:findUser["_id"],token}

   return res.status(200).send({status:true,message:"User login successfull",data:obj})

}
catch(error){
   return res.status(500).send({status:false,message:error.message})
}
}
  
  module.exports={createUser,loginUser}