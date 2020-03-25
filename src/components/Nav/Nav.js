import React, { useEffect } from 'react'
import icon from '../../assets/icon.svg'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout, checkUser } from '../../redux/userReducer'
import './Nav.scss'

function Nav(props) {
  const { user } = props
  useEffect(() => {
    if (!user.user_name) props.checkUser()
  }, [user.user_name])
  return (
    <header className="Nav">
      <div className='nav-logo-profile-container'>
        {user.user_name ? (
          <div className='profile-info-container'>
            <h1 id='nav-logo' className='hide-logo-mobile'>
              jeepThings
            </h1>
            <div className='profile-info-container'>
              <Link to='/profile' className='Link'  onClick={()=>{
              const mobileNav = document.getElementById('mobile-nav')
              if (document.querySelectorAll('#mobile-nav.show')) {
                mobileNav.classList.remove('show')
                mobileNav.classList.add('hide') 
              }
            }}>
                <img
                  src={user.profile_img}
                  alt='profile img'
                  className='profile-img'
                />
                <p className='profile-user-name'>{user.user_name}</p>
              </Link>
            </div>
          </div>
        ) : (
          <h1 id='nav-logo'>jeepThings</h1>
        )}
      </div>
      <button
        id='button-nav'
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
        <Link to='/' className='Link'>
          <li>about</li>
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
          <Link to='/' className='Link'>
            about
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
