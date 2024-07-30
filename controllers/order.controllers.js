const Order = require('../models/order.models'); // Adjust the path to your model if needed

exports.getAllOrders = async (req, res) => {
    try {
        const page = parseInt(req.query.page, 10) || 1; // Default to page 1 if not provided
        const limit = parseInt(req.query.limit, 10) || 10; // Default to limit 10 if not provided

        // Validate parameters
        if (page < 1 || limit < 1) {
            return res.status(400).json({
                success: false,
                error: 'Invalid page and/or limit integer(s).',
                httpStatus: 400
            });
        }

        // Calculate pagination values
        const skip = (page - 1) * limit;

        // Retrieve orders with pagination
        const count = await Order.countDocuments(); // Total number of documents
        const orders = await Order.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        // Create the response object
        const response = {
            success: true,
            payload: orders,
            httpStatus: 200,
            page: page,
            totalPages: Math.ceil(count / limit),
            count: orders.length,
            limit: limit
        };

        return res.status(200).json(response);
    } catch (e) {
        console.error(e.message);
        res.status(500).send({
            message: "Internal Server Error!"
        });
    }
};

exports.createOrder = async (req, res) => {
    try {
        const { orderID, sender, recipient, items, status } = req.body;

        if (!orderID || !sender || !recipient || !items) {
            return res.status(400).send({
                message: "Missing required fields!"
            });
        }

        const newOrder = new Order({
            orderID,
            sender,
            recipient,
            items,
            status
        });

        const savedOrder = await newOrder.save();
        return res.status(201).json({ savedOrder, message: 'Order created successfully' });
    } catch (e) {
        console.error(e.message);
        res.status(500).send({
            message: "Internal Server Error!"
        });
    }
};

exports.editOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const { sender, recipient, items, status } = req.body;

        if (!id) {
            return res.status(400).send({
                message: "Order ID is required!"
            });
        }

        const updatedOrder = await Order.findOneAndUpdate(
            { _id: id },
            { sender, recipient, items, status },
            { new: true, runValidators: true } // Return the updated document and run validators
        );

        if (!updatedOrder) {
            return res.status(404).send({ message: 'Order not found!' });
        }

        return res.status(200).json({ updatedOrder, message: 'Order edited successfully' });
    } catch (e) {
        console.error(e.message);
        res.status(500).send({
            message: "Internal Server Error!"
        });
    }
};

exports.deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).send({
                message: "Order ID is required!"
            });
        }

        const deletedOrder = await Order.deleteOne({ _id: id });

        if (!deletedOrder.deletedCount) {
            return res.status(404).send({ message: 'Order not found!' });
        }

        return res.status(200).json({ message: 'Order deleted successfully' });
    } catch (e) {
        console.error(e.message);
        res.status(500).send({
            message: "Internal Server Error!"
        });
    }
};
