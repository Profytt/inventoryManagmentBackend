const { Client } = require('pg');
const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

client.connect();

async function getAllProductsFromDB() {
    try {
        const result = await client.query('SELECT * FROM products');
        return result.rows;
    } catch (error) {
        throw error;
    }
}

async function getProductByIdFromDB(id) {
    try {
        const result = await client.query('SELECT * FROM products WHERE id = $1', [id]);
        return result.rows[0];
    } catch (error) {
        throw error;
    }
}

async function createProductInDB({ name, description, price, stock }) {
    try {
        const result = await client.query(`
            INSERT INTO products (name, description, price, stock)
            VALUES ($1, $2, $3, $4)
            RETURNING *;
        `, [name, description, price, stock]);
        return result.rows[0];
    } catch (error) {
        throw error;
    }
}

async function updateProductInDB({ id, name, description, price, stock }) {
    try {
        const result = await client.query(`
            UPDATE products
            SET name = $1, description = $2, price = $3, stock = $4
            WHERE id = $5
            RETURNING *;
        `, [name, description, price, stock, id]);
        return result.rows[0];
    } catch (error) {
        throw error;
    }
}

async function deleteProductFromDB(id) {
    try {
        const result = await client.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);
        return result.rows[0];
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAllProductsFromDB,
    getProductByIdFromDB,
    createProductInDB,
    updateProductInDB,
    deleteProductFromDB
};
