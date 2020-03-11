import React, { useState, useEffect } from 'react'
import routes from './routes'
import { withRouter } from 'react-router-dom'
import img1 from './assets/img1.jpg'
import img2 from './assets/img2.jpg'
import img3 from './assets/img3.jpg'
import img4 from './assets/img4.jpg'
import Nav from './components/Nav/Nav'
import { connect } from 'react-redux'
import { logout, checkUser } from './redux/userReducer'
import './App.css'

function App(props) {
  const imgArr = [img1, img2, img3, img4]
  let [imgIndex, setImgIndex] = useState(0)
  useEffect(() => {
    const interval = setInterval(
      () => setImgIndex(Math.floor(Math.random() * (imgArr.length - 1))),
      10000
    )
    return () => {
      return clearInterval(interval)
    }
  })
  return (
    <div
      className='App'
      style={{
        backgroundImage: `url(${imgArr[imgIndex]})`,
        transition: '1s'
      }}
    >
      {/* pass props to nav ...props to make history.push to work */}
      {props.location.pathname === '/' ? (
        <></>
      ) : (
        <Nav
          {...props}
          user={props.user}
          logout={props.logout}
          checkUser={props.checkUser}
        />
      )}
      {routes}
    </div>
  )
}

const mapStateToProps = reduxState => {
  const { user } = reduxState.userReducer
  return { user }
}

const mapDispatchToProps = {
  checkUser,
  logout
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App))
