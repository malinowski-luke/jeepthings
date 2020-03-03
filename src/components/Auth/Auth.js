import React, { useState, useEffect } from 'react'
import './Auth.css'

function Auth() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [registerBool, setRegisterBool] = useState(false)
  return (
    <section className='Auth'>
      <div className='auth-input-container'>
        <h1 className='auth-header'>jeepThings</h1>
        <input
          className='auth-input'
          type='text'
          placeholder='username'
          onChange={e => setUsername(e.target.value)}
        />
        <input
          className='auth-input'
          type='password'
          placeholder='password'
          onChange={e => setPassword(e.target.value)}
        />
        {!registerBool ? (
          <>
            <button className='auth-button'>Register</button>
            <p className='auth-change-text'>
              If you already have a account click{' '}
              <a
                className='auth-link'
                onClick={() => setRegisterBool(!registerBool)}
              >
                here
              </a>{' '}
              to login
            </p>
          </>
        ) : (
          <>
            <button className='auth-button'>Login</button>
            <p className='auth-change-text'>
              If you don't have a account click{' '}
              <a
                className='auth-link'
                onClick={() => setRegisterBool(!registerBool)}
              >
                here
              </a>{' '}
              to sign up
            </p>
          </>
        )}
      </div>
    </section>
  )
}

export default Auth
