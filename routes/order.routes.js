const orderController = require ('../controllers/order.controllers');

module.exports = function(app){
    app.get('/api/orders',orderController.getAllOrders);
    app.post('/api/orders',orderController.createOrder);
    app.put('/api/orders/:id',orderController.editOrder);
    app.delete('/api/orders/:id',orderController.deleteOrder);
}
