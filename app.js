var express = require('express');
var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000
var app = express();
var mp = require('./utils/mp');
var checkout = require('./utils/checkout');

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.static('assets'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/assets', express.static(__dirname + '/assets'));

app.get('/', function (req, res) {
    res.render('home');
});

app.get('/detail', function (req, res) {
    checkout.checkout(req.query, res);
});

app.post('/webcheckout', function(req, res){
    mp.simple(req.body, res);
});

app.get('/success', function (req, res) {

    console.log(req.originalUrl.split('?')[1].split('&'));

    try {
        let data = {
            "collection_id":req.originalUrl.split('?')[1].split('&')[0].replace("'",'').split('=')[1],
            "payment_id":req.originalUrl.split('?')[1].split('&')[2].replace("'",'').split('=')[1],
            "external_reference":req.originalUrl.split('?')[1].split('&')[4].replace("'",'').split('=')[1]
        };
        console.log(data);
        res.render('success', data);
        
    } catch (e) {
        res.render('success');
    }

});

app.get('/failure', function (req, res) {
    res.render('failure');
});

app.get('/pending', function (req, res) {
    res.render('pending');
});

app.post('/webhook', function(req, res) {
    var response = req.body;
    console.log("si trae data we");
    console.log(response);
    res.status(200);
    res.send({result:"successfully"});
});

app.listen(port);