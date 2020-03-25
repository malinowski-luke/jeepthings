CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  user_name VARCHAR(255),
  password VARCHAR(350),
  profile_img VARCHAR(350)
);

CREATE TABLE posts (
  post_id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  img VARCHAR(500),
  content VARCHAR(500),
  city VARCHAR(100),
  state VARCHAR(2),
  author_id INT REFERENCES users(user_id)
);

CREATE TABLE mailing_list (
  mailing_id SERIAL PRIMARY KEY,
  email VARCHAR (350)
);

INSERT INTO posts (title, img, content, price, city, state, author_id)
VALUES (
    'Shark Grill For JK Wrangler',
    'https://cdn.shopify.com/s/files/1/0011/0601/8351/products/shark-grille-matte-black-07-18-wrangler-jk-grilles-and-grille-deletes-am-off-road-323608.jpg?v=1582961689',
    'new shark grill for sale matte black fits 07-18',
    150,
    'Deer Park',
    'NY',
    1
),(
    'Shark Grill For JK Wrangler',
    'https://cdn.shopify.com/s/files/1/0011/0601/8351/products/shark-grille-matte-black-07-18-wrangler-jk-grilles-and-grille-deletes-am-off-road-323608.jpg?v=1582961689',
    'new shark grill for sale matte black fits 07-18',
    150,
    'Deer Park',
    'NY',
    2
);

INSERT INTO mailing_list (email) VALUES ('malinowski.luke123@gmail.com');