var data = require('./data.json');
var express = require('express');
var app = express();
app.use(express.static('public'));

app.listen(8080, function () {
    console.log("Listening on port " + 8080)
    console.log(data)
});


app.get('/api/findTHeBestPrice', function (req, res) {
    var query = { userID: req.query.userID };
    selectFromDB(sendRes, query);
    function sendRes(result) {
        console.log(result)
        res.send(result);
    }
})


app.get('/api/checkWeb', function (req, res) {
    var url = req.query.url;
    if (url.includes("amazon.com")) {
        res.send(true);
    }
})







