INSERT INTO users (
  user_name, 
  password, 
  profile_img, 
  is_admin
) VALUES ($1,$2,$3,$4)
RETURNING user_id, user_name, profile_img, is_admin;
