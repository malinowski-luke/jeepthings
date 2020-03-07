module.exports = {
  getAllUserPosts: async (req, res) => {
    const db = req.app.get('db')
    let posts = await db.get_all_user_posts()
    return res.status(202).send(posts)
  },
  getUserPosts: async (req, res) => {
    const db = req.app.get('db')
    const { user_id } = req.params
    let posts = await db.get_user_posts([user_id])
    return res.status(202).send(posts)
  },
  getCurrentPost: async (req, res) => {
    const db = req.app.get('db')
    const { user_id, post_id } = req.params
    let post = await db.get_current_post([user_id, post_id])
    return res.status(202).send(post)
  },
  addPost: (req, res) => {
    const db = req.app.get('db')
    const { user_id } = req.params
    const { title, img, content, price, city, state } = req.body
    db.add_post({ title, img, content, price, city, state, user_id })
      .then(() => {
        return res.sendStatus(200)
      })
      .catch(() => {
        return res.sendStatus(500)
      })
  },
  editPost: (req, res) => {
    const db = req.app.get('db')
  },
  deletePost: (req, res) => {
    const db = req.app.get('db')
    const { post_id } = req.params
    db.delete_post([post_id])
      .then(() => {
        return res.sendStatus(200)
      })
      .catch(() => {
        return res.sendStatus(500)
      })
  }
}
