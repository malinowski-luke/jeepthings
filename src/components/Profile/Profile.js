import React, { useState } from 'react'
import { connect } from 'react-redux'
import { updateProfileImg } from '../../redux/userReducer'
import { toast, ToastContainer } from 'react-toastify'

import './Profile.css'

function Profile(props) {
  const [editBool, setEditBool] = useState(false)
  const [imgPath, setImgPath] = useState('')
  const { user } = props
  return (
    <div className='Profile'>
      <div className='profile-container'>
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
            <div className='update-button-container'>
              <button
                className='profile-button profile-edit-button'
                onClick={() => {
                  if (imgPath !== '') {
                    props.updateProfileImg(user.user_id, imgPath)
                    setEditBool(!editBool)
                    setImgPath('')
                  } else {
                    toast.error('please enter a valid img path', {
                      position: toast.POSITION.BOTTOM_RIGHT
                    })
                  }
                }}
              >
                save
              </button>
              <button
                className='profile-button profile-edit-button'
                onClick={() => {
                  setEditBool(!editBool)
                  setImgPath('')
                }}
              >
                cancel
              </button>
            </div>
          </div>
        )}
      </div>
      <ToastContainer autoClose={2000} />
    </div>
  )
}

const mapStateToProps = reduxState => {
  const { user } = reduxState
  return { user }
}

export default connect(mapStateToProps, { updateProfileImg })(Profile)
