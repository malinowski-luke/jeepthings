import React, { useState } from 'react'
import { connect } from 'react-redux'

import './Profile.css'

function Profile(props) {
  const [editBool, setEditBool] = useState(false)
  const [imgPath, setImgPath] = useState('')
  const { user } = props
  return (
    <div className='Profile'>
      <div className='profile-container'>
        <div className='personal-info-container'>
          <img
            src={user.profile_img}
            alt={`profile pic ${user.user_name}`}
            className='profile-img-lg'
          />
          <p className='user-name-text'>{user.user_name}</p>
          {!editBool ? (
            <>
              <button
                className='profile-button'
                onClick={() => setEditBool(!editBool)}
              >
                update img
              </button>
            </>
          ) : (
            <div className='update-profile-form'>
              <input
                value={imgPath}
                placeholder='img path'
                className='profile-img-input'
                onChange={e => setImgPath(e.target.value)}
              />
              <button
                className='profile-button'
                onClick={() => setEditBool(!editBool)}
              >
                save
              </button>
            </div>
          )}
        </div>
        <div>
          <h1>my posts</h1>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = reduxState => {
  const { user } = reduxState
  return { user }
}

export default connect(mapStateToProps)(Profile)
