const mongoose =require('mongoose');


module.exports= async function dbconnection()
{
  await 
  mongoose.connect("mongodb://localhost:27017/GlassFrogDb").then(e=>console.log(e)).catch(err=>console.log(err));
}

