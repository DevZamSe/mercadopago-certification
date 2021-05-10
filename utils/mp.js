var https = require('follow-redirects').https;
var fs = require('fs');

var options = {
  'method': 'POST',
  'hostname': 'api.mercadopago.com',
  'path': '/checkout/preferences',
  'headers': {
    'Authorization': 'Bearer APP_USR-8208253118659647-112521-dd670f3fd6aa9147df51117701a2082e-677408439',
    'Content-Type': 'application/json',
    "x-integrator-id": 'dev_2e4ad5dd362f11eb809d0242ac130004'
  },
  'maxRedirects': 20,
  'followAllRedirects':true
};

async function createPreferencesSimple(info, res1) {

    console.log(info);

    let data = 
        {
            "items": [
                {
                    "title": info.title,
                    "description": "Dipositivo móvil de Tienda e-commerce",
                    "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Tour_eiffel_at_sunrise_from_the_trocadero.jpg/1200px-Tour_eiffel_at_sunrise_from_the_trocadero.jpg",
                    "quantity": 1,
                    "currency_id": "PEN",
                    "unit_price": parseInt(info.price)
                }
            ],
            "payer": {
                "name": "Lalo",
                "surname":"Landa",
                "email":"test_user_46542185@testuser.com",
                "phone": {
                    "area_code":"52",
                    "number": 5549737300
                },
                "identification": {
                    "type":"DNI",
                    "number":"22334445"
                },
                "address": {
                    "street_name":"Insurgentes sur",
                    "street_number":1602,
                    "zip_code":"03940"
                }
            },
            "payment_methods": {
                "excluded_payment_methods": [
                    {"id":"diners"}
                ],
                "excluded_payment_types": [
                    {"id":"atm"},
                ],
                "installments":6
            },
            "shipments": {
                "free_methods": [
                {}
                ],
                "receiver_address": {
                    "zip_code":"03940",
                    "street_name":"Insurgentes sur",
                    "street_number":1602
                }
            },
            "back_urls": {
                    "success": "https://mercadopago-devzamse.herokuapp.com/success",
                    "failure": "https://mercadopago-devzamse.herokuapp.com/failure",
                    "pending": "https://mercadopago-devzamse.herokuapp.com/pending"
            },
            "auto_return":"approved",
            "differential_pricing": {},
            "external_reference":"nilovila18@gmail.com"
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
            console.log("la preferencia oficial es ",response);
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