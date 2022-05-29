require('dotenv').config();
const mongoose =require('mongoose');

mongoose.connect("mongodb+srv://Bridge:Bridge%4078@cluster0.r3esmyp.mongodb.net/bridge?retryWrites=true&w=majority").then(()=>{
    console.log("connected to the Mongodb");
}).catch((e)=>{
    console.log(e);
})
