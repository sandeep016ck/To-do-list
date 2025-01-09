const mongoose=require("mongoose");

const tschema=new mongoose.Schema({
  desc:String,
  completion:Boolean,
})

const taskSchema=mongoose.Schema({
  user_id:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:"user"
  },
  task:{
    type:tschema,
    required:true
  }
})

module.exports=mongoose.model('task',taskSchema);