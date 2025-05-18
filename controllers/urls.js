// const UrlModel = require("../models/url");
const UrlModel =require("../models/url");



const shortid = require('shortid');

async function handleGenerateNewShortURL(req, res) {
    const body = req.body;

    if (!body || !body.url) {  // ✅ Use lowercase 'url'
        return res.status(400).json({ error: "Error While Generating URL" });
    }

    const Shortidd = shortid.generate(8); // ✅ Correct usage

const newData = UrlModel.create({
    shortId: Shortidd,
    redirectURL: body.url,
    visitedCount: []
});


    // const SaveData = await newData.save();

    res.status(200).json({ msg: "Data Added Successfully", data: Shortidd});
    //    return  res.render("home" ,{
    //     id:Shortidd
    //     });

    //  const Data=await UrlModel.find({});

    //   return  res.render("home" ,{
    //  id:Shortidd,
    //     urls:Data,
    // });
}



async function getAllUrls(req,res) {

    const Data=await UrlModel.find({});

    const html= `

        <ol>
                ${Data.map((url)=> ` <li> ${url.shortId}-${url.redirectURL}  -${url.visitHistory.length} and Complete shortURL http://localhost:5000/url/${url.shortId} </li>`).join("")}
        </ol>


    
    `

    // console.log(Data);

    // res.status(200).json(Data);
   return  res.render("home" ,{
    
        urls:Data,
    });
    
}

async function redirectToUrl(req, res) {
    const shortId = req.params.shortId;

    const entry = await UrlModel.findOneAndUpdate(
        { shortId },
        {
            $push: {
                visitHistory: { timestamp: Date.now() },
            },
        },
        { new: true }
    );

    if (!entry) {
        return res.status(404).json({ error: "Short URL not found" });
    }

    res.redirect(entry.redirectURL);
}



async function handleGetAnalyticsData(req,res)
{
    const shortId=req.params.shortId;
    const result=await UrlModel.findOne({shortId});
    return res.json({
        totalClicks:result.visitHistory.length,
        analytics : result.visitHistory,
    });
}

module.exports = {
    handleGenerateNewShortURL,getAllUrls,redirectToUrl,handleGetAnalyticsData
};
