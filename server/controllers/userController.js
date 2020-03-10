module.exports = {
  updateProfileImg: async (req, res) => {
    const db = req.app.get('db'),
      { user_id, newProfileImg } = req.body,
      { session } = req
    let profileImg = await db.update_profile_img([user_id, newProfileImg])
    session.user.profile_img = profileImg[0].profile_img
    return res.status(200).send(session.user)
  }
}
