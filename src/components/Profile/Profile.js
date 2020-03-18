import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { updateProfileImg } from '../../redux/userReducer'
import Upload from '../Upload/Upload'
import './Profile.scss'
function Profile(props){
  useEffect(()=>{
    const slidedownForm = document.getElementById('profile')
    if (slidedownForm) {
      slidedownForm.style.animation = 'slideDownProfile 0.5s ease-out forwards'
      slidedownForm.classList.add('fade-in-profile')
    }
  },[])
  const  {user, updateProfileImg} = props
  return (
    <div className='Profile'>
      <div className='profile-container' id='profile'>
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
