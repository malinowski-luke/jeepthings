import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { updateProfileImg } from '../../redux/userReducer'
import Upload from '../Upload/Upload'
import { slideDown } from '../utils/animations'
import './Profile.scss'

function Profile(props) {
  useEffect(() => {
    slideDown('profile')
  }, [])
  const { user, updateProfileImg } = props
  return (
    <div className='Profile'>
      <div className='profile-container' id='profile'>
        <h1>Update Profile</h1>
        <img
          src={user.profile_img}
          alt={`profile pic ${user.user_name}`}
          className='profile-img-lg'
        />
        <Upload user_id={user.user_id} updateProfileImg={updateProfileImg} />
        <p className='user-name-text'>{user.user_name}</p>
      </div>
    </div>
  )
}

const mapStateToProps = reduxState => {
  const { user } = reduxState.userReducer
  return { user }
}

export default connect(mapStateToProps, { updateProfileImg })(Profile)
