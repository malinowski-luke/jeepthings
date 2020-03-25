module.exports = {
  getAllUserPosts: async (req, res) => {
    const db = req.app.get('db')
    await db
      .get_all_user_posts()
      .then(response => {
        return res.status(202).send(response)
      })
      .catch(err => {
        console.log(err)
        return res.sendStatus(500)
      })
  },
  getCurrentPost: async (req, res) => {
    const db = req.app.get('db'),
      { post_id } = req.params
    await db
      .get_current_post([+post_id])
      .then(post => {
        return res.status(202).send(post[0])
      })
      .catch(err => {
        console.log(err)
        return res.sendStatus(500)
      })
  },
  addPost: (req, res) => {
    const db = req.app.get('db'),
      { user_id } = req.params,
      { title, img, content, price, city, state } = req.body
    db.add_post({ title, img, content, price, city, state, user_id })
      .then(() => {
        return res.sendStatus(200)
      })
      .catch(err => {
        return res.sendStatus(500)
      })
  },
  editPost: (req, res) => {
    const db = req.app.get('db'),
      { title, img, content, price, city, state } = req.body
    let { post_id } = req.params
    db.update_post({ title, img, content, price, city, state, post_id })
      .then(() => {
        return res.sendStatus(200)
      })
      .catch(err => {
        console.log(err)
        return res.sendStatus(500)
      })
  },
  deletePost: (req, res) => {
    const db = req.app.get('db'),
      { post_id } = req.params
    db.delete_post([+post_id])
      .then(() => {
        return res.sendStatus(200)
      })
      .catch(() => {
        return res.sendStatus(500)
      })
  }
}
