SELECT p.*,u.user_name, u.profile_img 
FROM posts p JOIN users u ON p.author_id = u.user_id
WHERE p.post_id = $1;