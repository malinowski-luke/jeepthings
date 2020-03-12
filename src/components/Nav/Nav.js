import React, { useEffect } from 'react'
import icon from '../../assets/icon.svg'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout, checkUser } from '../../redux/userReducer'
import './Nav.css'

function Nav(props) {
  const { user } = props
  useEffect(() => {
    if (!user.user_name) props.checkUser()
  }, [user.user_name])
  return (
    <header className='Nav'>
      <div className='nav-logo-profile-container'>
        {user.user_name ? (
          <div className='profile-info-container'>
            <h1 id='nav-logo' className='hide-logo-mobile'>
              jeepThings
            </h1>
            <div className='profile-info-container'>
              <Link to='/profile' className='Link'>
                <img
                  src={user.profile_img}
                  alt='profile img'
                  className='profile-img'
                />
              </Link>
              <p className='profile-user-name'>{user.user_name}</p>
            </div>
          </div>
        ) : (
          <h1 id='nav-logo'>jeepThings</h1>
        )}
      </div>
      <div>
        <button
          id='nav-button'
          onClick={() => {
            const mobileNav = document.getElementById('mobile-nav')
            mobileNav.classList.toggle('hide')
            mobileNav.classList.toggle('show')
          }}
        >
          Menu
          <img src={icon} alt='menu-icon' />
        </button>
        <ul
          id='mobile-nav'
          className='hide'
          onClick={() => {
            const mobileNav = document.getElementById('mobile-nav')
            mobileNav.classList.toggle('hide')
            mobileNav.classList.toggle('show')
          }}
        >
          <Link to='/about' className='Link'>
            <li>about</li>
          </Link>
          <Link to='/dashboard' className='Link'>
            <li>dashboard</li>
          </Link>
          <Link to='/posts' className='Link'>
            <li>posts</li>
          </Link>
          {props.user.user_name ? (
            <li
              onClick={() => {
                props.logout()
                props.history.push('/')
              }}
            >
              logout
            </li>
          ) : (
            <Link to='/login' className='Link'>
              <li>login</li>
            </Link>
          )}
        </ul>
        <ul id='desktop-nav'>
          <li>
            <Link to='/about' className='Link'>
              about
            </Link>
          </li>
          <li>
            <Link to='/dashboard' className='Link'>
              dashboard
            </Link>
          </li>
          <li>
            <Link to='/posts' className='Link'>
              posts
            </Link>
          </li>
          {user.user_name ? (
            <li
              onClick={() => {
                props.logout()
                props.history.push('/')
              }}
            >
              logout
            </li>
          ) : (
            <Link to='/login' className='Link'>
              <li>login</li>
            </Link>
          )}
        </ul>
      </div>
    </header>
  )
}
const mapStateToProps = reduxState => {
  const { user } = reduxState.userReducer
  return { user }
}

const mapDispatchToProps = {
  logout,
  checkUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav)
