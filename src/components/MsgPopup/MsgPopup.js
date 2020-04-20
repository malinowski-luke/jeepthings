import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { sendMsgToUser } from '../../redux/emailReducer'
import {
  slideDownPopup,
  fadeInPopupBackground,
  fadeOutPopupBackground,
} from '../utils/animations'
import { toast } from 'react-toastify'
import { Form, Row, Col, Button } from 'react-bootstrap'
import 'react-toastify/dist/ReactToastify.css'
import './MsgPopup.scss'

function MsgPopup(props) {
  const [msg, setMsg] = useState('')
  const resetInput = () => setMsg('')
  useEffect(() => {
    fadeInPopupBackground('popup-background')
    slideDownPopup('popup')
  }, [])
  const cancelClicked = (e) => {
    e.preventDefault()
    setTimeout(() => {
      props.setShowPopup(false)
    }, 1000)
    resetInput()
    fadeOutPopupBackground('popup-background')
  }
  const submitMsg = (e) => {
    if (msg) {
      props.sendMsgToUser({
        email: props.post.user_name,
        buyerEmail: props.user.user_name,
        profile_img: props.user.profile_img,
        msg,
        postTitle: props.post.title,
        img: props.post.img,
      })
      cancelClicked(e)
    } else {
      toast.error('please fill out the msg field', {
        position: toast.POSITION.TOP_RIGHT,
      })
    }
  }
  return (
    <div className='Popup' id='popup-background'>
      <div className='popup-Container' id='popup'>
        <h1 className='text-center'> Msg Seller</h1>
        <Form className='mt-2'>
          <Form.Group>
            <Form.Label>Send Email To Seller</Form.Label>
            <Form.Control
              as='textarea'
              rows={5}
              placeholder='Is this part still for sale .etc'
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Row>
            <Col>
              <Button
                onClick={(e) => cancelClicked(e)}
                size='lg'
                className='buttons'
                block
              >
                cancel
              </Button>
            </Col>
            <Col>
              <Button
                onClick={(e) => submitMsg(e)}
                className='buttons'
                size='lg'
                block
              >
                send
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  )
}

const mapStateToProps = (reduxState) => {
  const { post } = reduxState.postReducer,
    { user } = reduxState.userReducer
  return { user, post }
}

const mapDispatchToProps = {
  sendMsgToUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(MsgPopup)
