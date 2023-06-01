const stock_database = {};

(function () {

    let product_id = false;

    function new_product(name, unit, costValue, saleValue, quantity) {

        const product_data = {
            name: name,
            unit: unit,
            costValue: costValue,
            saleValue: saleValue,
            quantity: quantity,
            createdat: firebase.database.ServerValue.TIMESTAMP,
        };

        if (!product_id) {
            product_id = firebase.database().ref().child('product').push().key;
        };

        let updates = {};
        updates['/product/' + product_id] = product_data;

        let product_ref = firebase.database().ref();

        product_ref.update(updates)
            .then(function () {
                return { success: true, message: 'Product Created' };                
            })
            .catch(function (error) {
                return { success: false, message: `Product Creation Failed: ${error.message}` }
            })

    };

    function update_product() {
        if (!product_id) return { success: false, message: 'Invalid Product' };
    };

    stock_database.new = new_product;
    stock_database.update = update_product;

})()