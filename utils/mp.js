var https = require('follow-redirects').https;
var fs = require('fs');

var options = {
  'method': 'POST',
  'hostname': 'api.mercadopago.com',
  'path': '/checkout/preferences',
  'headers': {
    'Authorization': 'Bearer APP_USR-6655090400443592-110812-60ab28521b7f802873923d172c2c63b4-161054091',
    'Content-Type': 'application/json',
    "x-integrator-id": 1234
  },
  'maxRedirects': 20,
  'followAllRedirects':true
};

async function createPreferencesSimple(info, res1) {
    let data = 
        {
            "items": [
                {
                    "title": info.title,
                    "description": "by devzamse",
                    "picture_url": info.img,
                    "category_id": "smartphone",
                    "quantity": 1,
                    "currency_id": "PEN",
                    "unit_price": parseInt(info.price)
                }
            ],
            "payer": {
                "phone": {},
                "identification": {},
                "address": {}
            },
            "payment_methods": {
                "excluded_payment_methods": [
                {"id":"atm"},
                {"id":"dinners"}
                ],
                "excluded_payment_types": [
                {}
                ],
                "default_installments":6
            },
            "shipments": {
                "free_methods": [
                {}
                ],
                "receiver_address": {}
            },
            "back_urls": {
                    "success": "http://localhost:3000/success",
                    "failure": "http://localhost:3000/failure",
                    "pending": "http://localhost:3000/pending"
            },
            "differential_pricing": {}
        };

    var response
    
    var req = https.request(options, function (res) {
    var chunks = [];

        res.on("data", function (chunk) {
            chunks.push(chunk);
        });

        res.on("end", function (chunk) {
            var body = Buffer.concat(chunks);
            response = JSON.parse(body);
            // console.log(response.init_point);
            res1.redirect(response.init_point);
            // return response.init_point
        });

        res.on("error", function (error) {
            console.error(error);
        });
    });

    req.write(JSON.stringify(data));
    req.end();

}

module.exports = {
    simple: createPreferencesSimple
}