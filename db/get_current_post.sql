SELECT p.*,u.user_name, u.profile_img 
FROM posts p JOIN users u ON p.author_id = u.user_id
WHERE p.author_id = $1 AND p.post_id = $2;