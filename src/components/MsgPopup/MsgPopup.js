import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { sendMsgToUser } from '../../redux/emailReducer'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './MsgPopup.scss'

function MsgPopup(props) {
  const [msg, setMsg] = useState('')
  const resetInput = () => setMsg('')
  useEffect(() => {
    const slidedownForm = document.getElementById('popup'),
      fadeBackgroundForm = document.getElementById('popup-background')
    if (slidedownForm) {
      slidedownForm.style.animation = 'slideDownPopup 0.5s ease-out forwards'
      fadeBackgroundForm.classList.add('fade-in-popup')
    }
  }, [])
  const cancelClicked = e => {
    e.preventDefault()
    setTimeout(() => {
      props.setShowPopup(false)
    }, 1000)
    resetInput()
    const fadeBackgroundForm = document.getElementById('popup-background')
    fadeBackgroundForm.classList.remove('fade-in-popup')
    fadeBackgroundForm.classList.add('fade-out-popup')
  }
  const submitMsg = e => {
    if (msg) {
      props.sendMsgToUser({
        email: props.post.user_name,
        buyerEmail: props.user.user_name,
        msg,
        postTitle: props.post.title,
        img: props.post.img
      })
      cancelClicked(e)
    } else {
      toast.error('please fill out the msg field', {
        position: toast.POSITION.BOTTOM_RIGHT
      })
    }
  }
  return (
    <div className='Popup' id='popup-background'>
      <div className='popup-Container' id='popup'>
        <h1>Msg Seller</h1>
        <textarea
          value={msg}
          onChange={e => setMsg(e.target.value)}
          placeholder='msg to seller...'
        ></textarea>
        <div className='popup-button-container'>
          <button onClick={e => cancelClicked(e)}>cancel</button>
          <button onClick={e => submitMsg(e)}>send</button>
        </div>
      </div>
      <ToastContainer autoClose={2000} />
    </div>
  )
}

const mapStateToProps = reduxState => {
  const { post } = reduxState.postReducer,
    { user } = reduxState.userReducer
  return { user, post }
}

const mapDispatchToProps = {
  sendMsgToUser
}

export default connect(mapStateToProps, mapDispatchToProps)(MsgPopup)
