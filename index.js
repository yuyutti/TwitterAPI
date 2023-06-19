const express = require("express");
const app = express();
const TwitterAPI = require( __dirname + '/src/twitter_fetch')
require('dotenv').config();

const PORT = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.get("/api/v1/follower", async (req, res)=> {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === process.env.APIKEY) {
        try{
            const fetch_Id = req.query.twitterid
            const result = await TwitterID_fetch(fetch_Id)
            if(!result.follower){
                await res.json({ Error: result });
            }
            else{
                await res.json({ follower: result.follower });
            }
        }
        catch(error){
            await res.json(error)
        }
    }
    else{
        res.json({Error: 'APIKeyが正しくありません'})
    }
})

const TwitterID_fetch = async (fetch_Id) => {
    try {
        const response = await TwitterAPI(fetch_Id)
        return response
    }
    catch(error) {
        console.log(error)
    }
};

app.listen(PORT, () => {
    console.log(`>Express起動完了 listen:${PORT}`);
});