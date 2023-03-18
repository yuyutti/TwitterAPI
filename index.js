const EXPRESS = require("express");
const APP = EXPRESS();
const request = require('request');
require('dotenv').config();

const PORT = 3000

APP.use(EXPRESS.json())
APP.use(EXPRESS.urlencoded({ extended: true }));

APP.get("/api/v1/follower", (req, res)=> {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        follower_request().then(follower){
            res.json({followerCount: follower});
        }
    } else {
        res.json({ error: "header error" });
    }
    res.end();
})

APP.listen(PORT, () => {
    console.log(`${getTimeStamp()}>Express起動完了 listen:${PORT}`);
});

function follower_request() {
    const postoptions = {
        url: 'https://api.twitter.com/1.1/guest/activate.json',
        headers: {
            'authorization': process.env.TWITTER_API_TOKEN
        },
        json: true
    };
  
    request.post(postoptions, function(error, response, body) {
        const token = body.guest_token;
    
        console.log(token)

        const getoptions = {
            url: 'https://twitter.com/i/api/graphql/nZjSkpOpSL5rWyIVdsKeLA/UserByScreenName?variables=%7B%22screen_name%22%3A%22lauro_esports%22%2C%22withSafetyModeUserFields%22%3Atrue%7D&features=%7B%22responsive_web_twitter_blue_verified_badge_is_enabled%22%3Atrue%2C%22responsive_web_graphql_exclude_directive_enabled%22%3Atrue%2C%22verified_phone_label_enabled%22%3Afalse%2C%22responsive_web_graphql_skip_user_profile_image_extensions_enabled%22%3Afalse%2C%22responsive_web_graphql_timeline_navigation_enabled%22%3Atrue%7D',
            headers: {
            'authorization': process.env.TWITTER_API_TOKEN,
            'x-guest-token': token
            },
            json: true
        };

      
  
    request.get(getoptions, function(error, response, body) {
        const follower = body.data.user.result.legacy.followers_count;
        console.log(`follower count: ${follower}`);
    });
  });
};

function getTimeStamp() {
	const now = new Date();
	const hours = ("0" + now.getHours()).slice(-2);
	const minutes = ("0" + now.getMinutes()).slice(-2);
	const seconds = ("0" + now.getSeconds()).slice(-2);
	const timeStamp = `${hours}:${minutes}:${seconds} `;
	return timeStamp;
}