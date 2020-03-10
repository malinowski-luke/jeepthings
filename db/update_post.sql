UPDATE posts 
SET title = ${title}, 
  img = ${img},
  content = ${content},
  price = ${price}
WHERE post_id = ${post_id};