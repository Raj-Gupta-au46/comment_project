const mongoose= require("mongoose")
//=========================================VALIDATIONS=====================================================//
const isValidObjectId = (objectId) => {
    return mongoose.Types.ObjectId.isValid(objectId)
}
const validword=function(name){
  const regexName=/^(.|\s)*[a-zA-Z]+(.|\s)*$/;
 
  return regexName.test(name)
}
  
  const isValidString = (String) => {
    return /\d/.test(String)
  }

  
  
  const isValidPhone = (Mobile) => {
    return /^[6-9]\d{9}$/.test(Mobile)
  }
  
  const isValidEmail = (Email) => {
    return  /^([A-Za-z0-9._]{3,}@[A-Za-z]{3,}[.]{1}[A-Za-z.]{2,6})+$/.test(Email)
  }
  
  const isValidPswd = (Password) => {
    return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15}$/.test(Password)
  }

  

  module.exports={validword,isValidObjectId ,isValidString,isValidPhone,isValidEmail,isValidPswd}