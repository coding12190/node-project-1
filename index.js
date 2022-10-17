const express=require("express");
const app =express();
const Datastore=require("nedb");
const db=new Datastore("./data.db");
const fetch=require("node-fetch");
db.loadDatabase();
const port = process.env.PORT || 4000; //Please save other confidential keys in .env file
app.listen(port,()=>console.log(`Server started at port ${port}`));
app.use(express.static("Files"));
app.use(express.json());

app.get("/api",(req,res)=>{
    
    db.find({},(err,dataArr)=>{
        res.json(dataArr);
    })
});
app.post("/route",(req,res)=>{
    db.insert(req.body);
    req.body.status="Success";
    res.json(req.body);
})

app.post("/air-quality",(request,response)=>{
    const url=`https://api.openaq.org/v1/latest?city=${request.body.city}`;
    fetch(url)
    .then(res=>res.json())
    .then(data=>response.json(data.results[0]));
})
