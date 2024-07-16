const { Client } = require('pg');
const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

client.connect();

async function getAllOrdersFromDB() {
    try {
        const result = await client.query('SELECT * FROM orders');
        return result.rows;
    } catch (error) {
        throw error;
    }
}

async function getOrderByIdFromDB(id) {
    try {
        const result = await client.query('SELECT * FROM orders WHERE id = $1', [id]);
        return result.rows[0];
    } catch (error) {
        throw error;
    }
}

async function createOrderInDB({ user_id, product_id, quantity }) {
    try {
        const result = await client.query(`
            INSERT INTO orders (user_id, product_id, quantity)
            VALUES ($1, $2, $3)
            RETURNING *;
        `, [user_id, product_id, quantity]);
        return result.rows[0];
    } catch (error) {
        throw error;
    }
}

async function updateOrderInDB({ id, user_id, product_id, quantity }) {
    try {
        const result = await client.query(`
            UPDATE orders
            SET user_id = $1, product_id = $2, quantity = $3
            WHERE id = $4
            RETURNING *;
        `, [user_id, product_id, quantity, id]);
        return result.rows[0];
    } catch (error) {
        throw error;
    }
}

async function deleteOrderFromDB(id) {
    try {
        const result = await client.query('DELETE FROM orders WHERE id = $1 RETURNING *', [id]);
        return result.rows[0];
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAllOrdersFromDB,
    getOrderByIdFromDB,
    createOrderInDB,
    updateOrderInDB,
    deleteOrderFromDB
};
