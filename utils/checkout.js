function CheckoutMP(info, res) {
    const mp = require('mercadopago');

    console.log(info);
    
    mp.configure({
        access_token: 'APP_USR-8208253118659647-112521-dd670f3fd6aa9147df51117701a2082e-677408439',
        integrator_id: 'dev_2e4ad5dd362f11eb809d0242ac130004'
    });

    let data = 
        {
            "items": [
                {
                    "id":"1234",
                    "title": info.title,
                    "currency_id":"PEN",
                    "description": "Dipositivo móvil de Tienda e-commerce",
                    "picture_url": info.img,
                    "quantity": 1,
                    "unit_price": parseInt(info.price),
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
                    "street_name":"Insurgentes Sur",
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
                "receiver_address": {
                    "zip_code":"03940",
                    "street_name":"Insurgentes Sur",
                    "street_number":1602,
                    "country_name":"Peru",
                    "state_name":"Lima",
                    "city_name":"Lima"
                }
            },
            "back_urls": {
                    "success": "https://mercadopago-devzamse.herokuapp.com/success",
                    "failure": "https://mercadopago-devzamse.herokuapp.com/failure",
                    "pending": "https://mercadopago-devzamse.herokuapp.com/pending"
            },
            "auto_return":"approved",
            "external_reference":"nilovila18@gmail.com",
            "notification_url":"https://mercadopago-devzamse.herokuapp.com/webhook"
        };


    mp.preferences.create(data)
    .then(function(response){
        info.ide = response.body.id.toString();
        console.log(info);
        res.render('detail', info);
    }).catch(function(error){
        console.log(error);
    });


}

module.exports = {
    checkout: CheckoutMP
}