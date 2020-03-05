CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  user_name VARCHAR(255),
  password VARCHAR(350),
  profile_img VARCHAR(350),
  is_admin BOOLEAN
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