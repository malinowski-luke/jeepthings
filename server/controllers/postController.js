module.exports = {
  getAllUserPosts: async (req, res) => {
    const db = req.app.get('db')
    let posts = await db.get_all_user_posts()
    return res.status(202).send(posts)
  }
}
