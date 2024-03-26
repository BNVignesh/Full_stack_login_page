const express=require('express');
const db=require('mysql')
const app=express();
const bcrypt=require('bcrypt');
const cors=require('cors')
app.use(cors())
app.use(express.json());
const salt=10;
let con=db.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'login'
});

con.connect(function(err){
    if(err){
        console.error('error connecting to database: ',err);
        return;
    } 
    console.log('connection success');
})

app.post('/register',(req,res)=>{
    const sql='insert into user (`name`,`email`,`password`) values (?,?,?)';
    bcrypt.hash(req.body.password.toString(),salt,(err,hash)=>{
        if(err) return res.json({error:'error in hashing'});
        const values=[
            req.body.name,
            req.body.email,
            hash
        ]
        con.query (sql,values,(err,result)=>{
            if(err) return res.json({err});
            return res.json({Status:'success'});
        })   
    })
})

app.post('/login',(req,res)=>{
    const sql='select * from user where email=?';
    con.query(sql,[req.body.email],(err,data)=>{
        if(err) return res.json({Error:'error in query'})
        if(data.length>0){
            
            bcrypt.compare(req.body.password.toString(),data[0].password,(err,resolve)=>{
                if(err) return res.json({Error:'password compare error'})
                
                if(resolve){
                    
                    return res.json({Status:'success'})

                }else{
                    
                    return res.json({Error:'password does not match'})
                }
            })
        }else{
            return res.json({Error:'email does not exit'})  
        }
    })
    
})

app.listen('8088',()=>{
    console.log('listening');
});

