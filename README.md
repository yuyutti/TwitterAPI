# TwitterAPI

TwitterAPIが有料となったためグレーゾーンですが、TwitterGlobalAPI(TwitterGuestAPI)を使用して対象ユーザーのデータを取得するAPIです。

現在のところ指定したユーザーのフォロワー数、フォロー数の取得のみ行えます。

## 使い方
前提として、node.jsをインストール済みであることとします。
1. ソースコードをcloneするなりしてローカル環境に落とし込んでください。
2. ```npm i```でモジュールをインストールしてください。
3. ```node index.js```でExpressサーバーを起動してください。
(webサーバーは3000Portで起動しています)

## APIの実行方法

### 情報
- method : GET
- path : ```/api/v1/follower```
- parameter : ```?twitterid={TwitterID}```
- requestheader : { Authorization : APIKEY }

APIKEYは.envファイルで変更可能です
デフォルトでは「apiaccesstoken」になっていますので変更することをお勧めします。

### 返り値
```
{
    "screen_name": "{TwitterID}",
    "followerCount": {int},
    "following": {int}
}
```
{TwitterID}・・・パラメーターで指定したTwitterのユーザーIDが表示されます
{int}・・・整数が表示されます

返り値はjson形式で帰ってきます

※envファイルに記載されてある「TWITTER_API_TOKEN」は「Authorization」の固定値なので公開して問題ない情報です