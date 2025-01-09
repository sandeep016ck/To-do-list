const asyncHandler=require("express-async-handler");
const taskmodel=require("../models/taskModel");



const getTask=asyncHandler( async (req,res)=>{
  
    const task=await taskmodel.findById(req.params.id);
   
    if(!task){
      res.status(400).json({message:"task not found"})
    }
      res.status(200).json({task})
    

})

const getTasks=asyncHandler(async (req,res)=>{
  const task=await taskmodel.find({user_id:req.user.id});
  if(task){
    res.status(200).json({task})
  }else{
    res.status(400).json({message:"not found!!!"})
  }
})

const createTask=asyncHandler(async (req,res)=>{
  const {task}=req.body;
  if(task){
    const ctask=await taskmodel.create({
      user_id:req.user.id,
      task
    })
    res.status(201).json(ctask);
  }else{
    res.status(404);
    throw new Error("all fields are mandatory")

  }
})

const updateTask=asyncHandler(async(req,res)=>{
    const utask=await taskmodel.findById(req.params.id);
    if(!utask){
      res.status(404).json({message:" task not found"})
    }   
    if(utask.user_id!=req.user.id){
      res.status(403).json({message:"unauthorized user"})
      
    }
    const updatedtask=await taskmodel.findByIdAndUpdate(
      req.params.id,
      {$set:req.body},
      {new:true}
    )

    res.status(200).json(updatedtask)
})

const deleteTask=asyncHandler(async(req,res)=>{
  const t=await taskmodel.findById(req.params.id);
  if(!t){
    res.status(404).json({message:"not found!!!!"})
  }
  if(t.user_id!=req.user.id){
    res.status(403).json({message:"unauthorized user"})
  }

  const deleted=await taskmodel.findByIdAndDelete(req.params.id);
  res.status(200).json(deleted);

})





module.exports={getTask,getTasks,createTask,updateTask,deleteTask};