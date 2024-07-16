const { Client } = require('pg');
const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

client.connect();

async function createUser(username, hashedPassword) {
    try {
        const result = await client.query(`
            INSERT INTO users (username, password)
            VALUES ($1, $2)
            RETURNING id, username;
        `, [username, hashedPassword]);
        return result.rows[0];
    } catch (error) {
        throw error;
    }
}

async function getUserByUsername(username) {
    try {
        const result = await client.query(`
            SELECT * FROM users WHERE username = $1;
        `, [username]);
        return result.rows[0];
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createUser,
    getUserByUsername
};
