import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import {
  login as loginRedux,
  register as registerRedux,
  clearUserReducer,
} from '../../redux/userReducer'
import { slideDown } from '../utils/animations'
import { toast } from 'react-toastify'
import toastSettingObj from '../utils/custom-toast/toastSettingObj'
import {Form, Button} from 'react-bootstrap'
import './Auth.scss'

function Auth(props) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [registerBool, setRegisterBool] = useState(false)
  useEffect(() => {
    if (props.user.user_name) props.history.push('/posts')
    slideDown('login')
  }, [props.user])
  const resetInput = () => {
    setUsername('')
    setPassword('')
  }
  const register = () => {
    if (username !== '' && password !== '') {
      props.registerRedux(username, password)
      resetInput()
    } else toast('please fill out all the fields', toastSettingObj)
  }
  const login = () => {
    if (username !== '' && password !== '') {
      props.loginRedux(username, password)
      resetInput()
    } else toast('please fill out all the fields', toastSettingObj)
  }
  if (props.err) {
    toast.error(props.errMsg, toastSettingObj)
    props.clearUserReducer()
  }
  return (
    <section className='Auth'>
      <div id='login' className='auth-container animation-contianer'>
        <Form>
          <h1 className='auth-header text-center mb-4'>jeepThings</h1>
          <Form.Group controlId='formBasicEmail'>
            <Form.Label className='label'>Email</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId='formBasicEmail'>
            <Form.Label className='label'>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <div className='text-center'>
            {!registerBool ? (
              <>
                <Button
                  size='sm'
                  className='buttons'
                  onClick={() => register()}
                  block
                >
                  Register
                </Button>
                <p className='mt-4'>
                  If you already have a account click{' '}
                  <span
                    className='auth-link'
                    onClick={() => setRegisterBool(!registerBool)}
                  >
                    here
                  </span>{' '}
                  to login
                </p>
              </>
            ) : (
              <>
                <Button
                  size='sm'
                  className='buttons'
                  onClick={() => login()}
                  block
                >
                  Login
                </Button>
                <p className='mt-4'>
                  If you don't have a account click{' '}
                  <span
                    className='auth-link'
                    onClick={() => setRegisterBool(!registerBool)}
                  >
                    here
                  </span>{' '}
                  to sign up
                </p>
              </>
            )}
          </div>
        </Form>
      </div>
    </section>
  )
}

const mapStateToProps = (reduxState) => {
  return reduxState.userReducer
}

const mapDispatchToProps = {
  loginRedux,
  registerRedux,
  clearUserReducer,
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
