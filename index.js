//index.js


const express=require("express");
const router=require("./routes/url")
const {Connection}=require("./connect"); 
const URL=require("./models/url")

const path=require("path");


const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));

const PORT=5000;


Connection("mongodb://127.0.0.1:27017/").then(()=>
{
        console.log("Connected to mongoDb");
})

app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

app.use("/url",router);






app.listen(PORT,()=>
{
    console.log(`Server listening at Port ${PORT}`);
})
