const express=require("express");
const app=express();
const cors = require("cors");
const dotenv=require("dotenv");
const connectdb = require("./config/dbconnection");

dotenv.config();
app.use(express.json());
app.use(cors())
const port=process.env.PORT; 

connectdb();
app.use('/api/to-do/user',require("./routes/userRoutes"));
app.use('/api/to-do/task',require('./routes/taskroutes'));

app.listen(port,()=>{
  console.log(`server is running at port ${process.env.PORT}`);
})