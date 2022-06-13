const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors")
const app= express();

const empModel=require("./models/emp");

app.use(express.json())
app.use(cors());


mongoose.connect("mongodb://localhost:27017/empData",{
    useNewUrlParser:true,
});
app.post('/insert', async(req,res)=>{
    
    const username=req.body.username;
    const email=req.body.email;
    const jobDescription=req.body.jobDescription;
    const password=req.body.password;

      const emp= new empModel({ username: username,
      email:email,
      password:password});

      try{
           await emp.save();
           //console.log('here')
           res.send("inserted data")
      }catch(err){
          console.log(err)
      }
})
app.get('/read', async(req,res)=>{
    
    empModel.find({},(err,result)=>{
     if(err){
         res.send(err);
     }

      res.send(result);
    })
})

app.get('/getUserById/:id', async(req,res)=>{
    
    empModel.find({_id:req.params.id},(err,result)=>{
     if(err){
         res.send(err);
     }

      res.send(result);
    })
})

app.put('/update/:id', async(req,res)=>{
    try{
        const updateEmployee = await empModel.updateMany({_id:req.params.id}, {
            $set:{
                employeeName: req.body.employeeName,
                email: req.body.email,
                jobDescription: req.body.jobDescription
            }
        })
      res.json(updateEmployee)
       
    }catch(err) {
         console.log(err);
    }
    
   
})

app.delete('/delete/:id', async (req, res) =>{

    const deletedEmployee = await empModel.remove({_id:req.params.id})
    res.send(deletedEmployee)
})



app.use('/', (req,res)=>{
    res.send("Endpoint")
})


app.listen(3002,()=>{
   console.log("server running on port 3002...");
});