import React, { useEffect } from 'react'
import icon from '../../assets/icon.svg'
import './Nav.css'
import { Link } from 'react-router-dom'

function Nav(props) {
  //comment out only when working on css to not login every refresh
  // useEffect(() => {
  //   props.checkUser()
  //   if (!props.user.user_name) props.history.push('/')
  // }, [props.user])
  return (
    <header className='Nav'>
      <div className='nav-logo-profile-container'>
        <h1 id='nav-logo'>jeepThings</h1>
        <div className='profile-img-container'>
          <Link to='/profile'>
            <img
              src={props.user.profile_img}
              alt='profile img'
              className='profile-img'
            />
          </Link>
        </div>
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
          <Link to='/post' className='Link'>
            <li>post</li>
          </Link>
          <Link to='/profile' className='Link'>
            <li>profile</li>
          </Link>
          <li
            onClick={() => {
              props.logout()
            }}
          >
            logout
          </li>
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
            <Link to='/post' className='Link'>
              post
            </Link>
          </li>
          <li>
            <Link to='/profile' className='Link'>
              profile
            </Link>
          </li>
          <li
            onClick={() => {
              props.logout()
            }}
          >
            logout
          </li>
        </ul>
      </div>
    </header>
  )
}

export default Nav
