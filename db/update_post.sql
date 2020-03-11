UPDATE posts 
SET title = ${title}, 
  img = ${img},
  content = ${content},
  price = ${price},
  city = ${city},
  state = ${state}
WHERE post_id = ${post_id};