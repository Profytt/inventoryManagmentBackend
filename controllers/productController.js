const { getAllProductsFromDB, getProductByIdFromDB, createProductInDB, updateProductInDB, deleteProductFromDB } = require('../models/productModel');

const getAllProducts = async (req, res) => {
    try {
        const products = await getAllProductsFromDB();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await getProductByIdFromDB(id);
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createProduct = async (req, res) => {
    const { name, description, price, stock } = req.body;
    try {
        const product = await createProductInDB({ name, description, price, stock });
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, description, price, stock } = req.body;
    try {
        const product = await updateProductInDB({ id, name, description, price, stock });
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await deleteProductFromDB(id);
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};
