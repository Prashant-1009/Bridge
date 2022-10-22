require('dotenv').config();
const mongoose =require('mongoose');

mongoose.connect(process.env.dbbat).then(()=>{
    console.log("connected to the Mongodb");
}).catch((e)=>{
    console.log(e);
})
