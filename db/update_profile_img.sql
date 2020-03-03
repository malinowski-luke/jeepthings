UPDATE users
SET profile_img =$2
WHERE user_id = $1
RETURNING profile_img;