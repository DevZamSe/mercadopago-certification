function CheckoutMP(info, res) {
    const mp = require('mercadopago');
    
    mp.configure({
        access_token: 'APP_USR-6655090400443592-110812-60ab28521b7f802873923d172c2c63b4-161054091'
    });

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