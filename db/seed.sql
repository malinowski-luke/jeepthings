CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  user_name VARCHAR(255),
  password VARCHAR(350),
  profile_img VARCHAR(350),
  is_admin BOOLEAN
);