import express, { urlencoded } from "express";
import cors from 'cors';
import {db} from "./connect.js";
const app = express();
const port = 3000;
app.use(cors({
  origin:"http://localhost:4200",
  credentials: true  
}));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/", (req,res)=>{
    db.query('select * from userTable',(err,data)=>{
      if(err) {console.log(err);}
      return res.status(200).json(data);
    });
})

app.delete("/delete",(req,res)=>{
 
  const ID=req.query.ID;
 
       db.query(`delete from userTable where ID = ?`,[ID],(err,data)=>{
        if (err) {
          console.log(err);
          return res.status(500).json({ error: 'Failed to delete data' });
        }
        return res.status(200).json({ message: 'Data deleted successfully' });
       });
});

app.post('/addUsers',(req,res)=>{

        db.query(`insert into userTable (name, emailId, role, userGroup, 
          createdBy, createdOn, action, department, firstName, lastName, 
          jobTitle, primaryNumber, secondaryNumber, fax)
          values (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,[req.body.name, req.body.emailId, req.body.role, req.body.userGroup, 
            req.body.createdBy, req.body.createdOn, req.body.action, req.body.department, req.body.firstName, req.body.lastName, 
            req.body.jobTitle, req.body.primaryNumber, req.body.secondaryNumber, req.body.fax],(err,data)=>{
              if(err) {
                 console.log(err);
                 return res.status(500).json({error: 'Failed to add data'});
              }
              return res.status(200).json({message:'Data is added succesfully'});
          })
});


app.listen(port , ()=>{
     console.log("Server is running on port.");
     
})