INSERT INTO users (
  user_name, 
  password, 
  profile_img 
) VALUES ($1,$2,$3)
RETURNING user_id, user_name, profile_img;
