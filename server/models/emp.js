const mongoose=require('mongoose')


const employeeSchema= new mongoose.Schema({
    employeeName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    jobDescription:{
        type:String,
        required:true,
    }, 
    password:{
        type:Number,
        required:true,
    },   
});
const employee= mongoose.model("employee",employeeSchema);
module.exports= employee;