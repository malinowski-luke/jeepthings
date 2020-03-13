import React, { useState } from 'react'
import { connect } from 'react-redux'
import { updateProfileImg } from '../../redux/userReducer'
import Upload from '../Upload/Upload'
import './Profile.scss'

function Profile(props) {
  const  {user, updateProfileImg} = props
  return (
    <div className='Profile'>
      <div className='profile-container'>
        <img
          src={user.profile_img}
          alt={`profile pic ${user.user_name}`}
          className='profile-img-lg'
        />
        <p className='user-name-text'>{user.user_name}</p>
        <Upload user_id={user.user_id} updateProfileImg={updateProfileImg} />
      </div>
    </div>
  )
}

const mapStateToProps = reduxState => {
  const { user } = reduxState.userReducer
  return { user }
}

export default connect(mapStateToProps, { updateProfileImg })(Profile)
