const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    itemName: { type: String, required: true },
    quantity: { type: Number, required: true },
    description: String
  });

const orderSchema = new mongoose.Schema({
  orderID: { type: String, unique: true, required: true },
  sender: {
    name: { type: String, required: true },
    address: { type: String, required: true },
    contact: { type: String, required: true }
  },
  recipient: {
    name: { type: String, required: true },
    address: { type: String, required: true },
    contact: { type: String, required: true }
  },
  items: [itemSchema],
  status: {
    type: String,
    enum: ['Pending', 'Shipped', 'In Transit', 'Delivered', 'Cancelled'],
    default: 'Pending'
  },
  createdAt: { type: Date, default: Date.now, required: true },
  updatedAt: { type: Date, default: Date.now, required: true }
});

module.exports= mongoose.model("Order",orderSchema);