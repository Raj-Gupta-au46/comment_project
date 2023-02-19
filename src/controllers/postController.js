const userModel=require('../models/userModel')
const postModel=require('../models/postModel')



//=================================================post api's===============================================//
const createPost= async function(req, res) {
    try{
    const data= req.body;
    const Post=await postModel.create(data);
    return res.status(201).send(Post);
    }
    catch(error){
        return  res.status(500).send({status:false,msg:error.message})
    }
  }

  
const getPost=async function(req, res){
  try{
  let data=req.params.userId
  if(!data){
    let completeData= await postModel.find()
    return res.status(200).send({status:true,data:completeData})
  }
  const verify=await postModel.findById({userId:data},{isdeleted:false})
    if(!verify){
      return res.status(404).send({status:false,msg:"post not found"})
    }
    const search = await postModel.findById(data);
    return res.status(200).send({status:true,msg:search});
  }
  catch(error){
    return res.status(500).send({status:false,msg:error.message})
  }
  };
  
  
  
  
 const updatePost=async function(req, res){
  try{  
  const { postId } = req.params;
    const { title, content } = req.body;
    const verify=await postModel.findById({postId},{isdeleted:false})
    if(!verify){
      return res.status(404).send({status:false,msg:"post not found"})
    }
    const post = await postModel.findByIdAndUpdate(postId,{ $set: { title, content }},{ new: true });
    return res.status(200).send({status:true,data:post});
  }
  catch(error){
    return res.status(500).send({status:false,msg:error.message})
  }
  };
  
  
  const deletePost=async function(req, res){
    try{
    const { postId } = req.params;
    const verify=await postModel.findById({postId},{isdeleted:false})
    if(!verify){
      return res.status(404).send({status:false,msg:"post not found"})
    }
    await postModel.findByIdAndUpdate({postId},{$set:{isdeleted:true}});
    res.Status(200).send({status:true,msg:"Post deleted susccesfully"});
    }
    catch(error){
      return res.status(500).send({status:false,msg:error.message})
    }
  };


  //==================================comments api's=============================================//
 
  const postComment = async function(req, res){
    try {
      const postId = req.params.postId;
      const { content, commentedId,userId } = req.body;
      
      const post = await postModel.findById(postId);
      if (!post) {
        return res.status(404).send({ status: false, msg: "Post not found" });
      }
      
      post.comments.push({ content, commentedId });
      const newData = await post.save();
      
      res.status(201).send({ data: newData });
    } catch(error) {
      return res.status(500).send({ status: false, msg: error.message });
    }
  }
  

const nestedComments=async function(req, res){
  try{  
  const { postId, commentId } = req.params;
    const { content, author } = req.body;
    const post = await postModel.findById(postId);
    const comment = post.comments.id(commentId);
    comment.comments.push({ content, author });
    await post.save();
    res.json(comment.comments);
  }
  catch(error){
    return res.status(500).send({status:true,msg:error.message})
  }
  }
  
  module.exports={createPost,getPost,updatePost,deletePost,postComment,nestedComments}