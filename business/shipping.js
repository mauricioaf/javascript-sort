var Request = require("request");

module.exports = {

    offerShippingOptions: function (callback) {
        Request.get("https://shipping-options-api.herokuapp.com/v1/shipping_options", (error, response, body) => {
            if (error) {
                return console.dir(error);
            }
            const parse = JSON.parse(body);
            //callback(sort(parse.shipping_options));
            callback(sort([
                { "name": "Option 1", "type": "Delivery", "cost": 10, "estimated_days": 5 },
                { "name": "Option 2", "type": "Custom", "cost": 5, "estimated_days": 4 },
                { "name": "Option 3", "type": "Pickup", "cost": 7, "estimated_days": 1 },
                { "name": "Option 4", "type": "Delivery", "cost": 10, "estimated_days": 3 },
            ]))
        });

        function sort(response) {
            return response.sort((a, b) => {
                let order = 0;
                order = compareByCost(a, b);
                if (order !== 0) return order;
                order = compareByEstimatedDays(a, b);
                if (order !== 0) return order;
                order = compareByName(a, b);
                return order;
            });
        }

        function compareByName(a, b) {
            return a.name.localeCompare(b.name);
        }
        
        function compareByCost(a, b) {
            if (a.cost > b.cost) return 1;
            if (a.cost < b.cost) return -1;
            return 0;
        }

        function compareByEstimatedDays(a, b) {
            if (a.estimated_days > b.estimated_days) return 1;
            if (a.estimated_days < b.estimated_days) return -1;
            return 0;
        }

    }

}