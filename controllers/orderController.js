const { getAllOrdersFromDB, getOrderByIdFromDB, createOrderInDB, updateOrderInDB, deleteOrderFromDB } = require('../models/orderModel');

const getAllOrders = async (req, res) => {
    try {
        const orders = await getAllOrdersFromDB();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getOrderById = async (req, res) => {
    const { id } = req.params;
    try {
        const order = await getOrderByIdFromDB(id);
        res.json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createOrder = async (req, res) => {
    const { user_id, product_id, quantity } = req.body;
    try {
        const order = await createOrderInDB({ user_id, product_id, quantity });
        res.json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateOrder = async (req, res) => {
    const { id } = req.params;
    const { user_id, product_id, quantity } = req.body;
    try {
        const order = await updateOrderInDB({ id, user_id, product_id, quantity });
        res.json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteOrder = async (req, res) => {
    const { id } = req.params;
    try {
        const order = await deleteOrderFromDB(id);
        res.json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder
};
