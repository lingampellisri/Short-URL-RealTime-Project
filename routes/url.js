//routes.js



const express=require("express");

const {handleGenerateNewShortURL,getAllUrls,redirectToUrl,handleGetAnalyticsData}=require("../controllers/urls")




const router=express.Router();
router.post("/",handleGenerateNewShortURL);
router.get("/All",getAllUrls);
router.get("/:shortId",redirectToUrl);
router.get("/analytics/:shortId",handleGetAnalyticsData);

module.exports=router;

