-- seed.sql

-- Inserting users
INSERT INTO users (username, password) VALUES
('user1', 'password1'),
('user2', 'password2');

-- Inserting products
INSERT INTO products (name, description, price, stock) VALUES
('Product 1', 'Description 1', 10.99, 100),
('Product 2', 'Description 2', 20.99, 200);

-- Inserting orders
INSERT INTO orders (user_id, product_id, quantity) VALUES
(1, 1, 2),
(2, 2, 3);
