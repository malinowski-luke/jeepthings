import React from 'react'
import icon from '../../assets/icon.svg'
import './Nav.css'

function Nav(props) {
  return (
    <header className='Nav'>
      <div className='nav-logo-profile-container'>
        <h1 id='nav-logo'>jeepThings</h1>
        <div className='profile-img-container'>
          <img
            src={props.user.profile_img}
            alt='profile img'
            className='profile-img'
          />
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
        <ul id='mobile-nav' className='hide'>
          <li>about</li>
          <li>post</li>
          <li>profile</li>
          <li
            onClick={() => {
              props.logout()
            }}
          >
            logout
          </li>
        </ul>
        <ul id='desktop-nav'>
          <li>about</li>
          <li>post</li>
          <li>profile</li>
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
