const follower_request = async(TwitterID) => {
    let active_token
    try {
        const response = await fetch("https://api.twitter.com/1.1/guest/activate.json", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA',
            }
        })
        let purse = await response.json()
        active_token = purse.guest_token
    } catch (error) {
        return error
    }
    try {
        const response = await fetch(`https://api.twitter.com/1.1/users/show.json?screen_name=${TwitterID}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA',
                'x-guest-token': active_token
            }
        })
        let purse = await response.json()
        console.log(purse)
        if (purse && purse.errors && purse.errors[0] && purse.errors[0].code === 50) {
            return "アカウントが見つかりませんでした";
        }
        const name = purse.name
        const screen_name = purse.screen_name
        const follower = purse.followers_count
        const following = purse.friends_count
        const id = purse.id
        const liked = purse.favourites_count
        const tweet = purse.statuses_count
        const media = purse.media_count
        const createdDate = new Date(purse.created_at);
        const year = createdDate.getFullYear();
        const month = createdDate.getMonth() + 1;
        const day = createdDate.getDate();
        const weekday = ['日', '月', '火', '水', '木', '金', '土'][createdDate.getDay()];
        const created = `${year}年${month}月${day}日 (${weekday}) ${createdDate.toLocaleTimeString('ja-JP')}`;        
        const return_json = { name, screen_name, follower, following, id, liked, tweet, media, created }
        return return_json
    }
    catch(error) {
        console.log(error)
        return "Error"
    }
}

module.exports = follower_request;