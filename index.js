//index.js


const express=require("express");
const router=require("./routes/url")
const {Connection}=require("./connect"); 
const URL=require("./models/url")


const app=express();

app.use(express.json());

const PORT=5000;


Connection("mongodb://127.0.0.1:27017/").then(()=>
{
        console.log("Connected to mongoDb");
})

app.use("/url",router);

app.get("/:shortId",async (req,res)=>
{
    const shortId=req.params.shortId;
  const entry=  await  URL.findOneAndUpdate({
        shortId
    },

    {
        $push:{
            visitHistory: {timestamp :Date.now()},
        }
    }
);
res.redirect(entry.redirectURL);
})




app.listen(PORT,()=>
{
    console.log(`Server listening at Port ${PORT}`);
})
