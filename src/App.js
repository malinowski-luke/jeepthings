import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import routes from './routes'
import Nav from './components/Nav/Nav'
import { ToastContainer } from 'react-toastify'
import { randomIndex, imgArr } from './components/utils/backgroundUtils'
import './App.scss'

function App(props) {
  const [imgIndex, setImgIndex] = useState(0),
    handleImgChange = () => setImgIndex(randomIndex())
  useEffect(() => {
    const interval = setInterval(() => handleImgChange(), 30000)
    return () => {
      return clearInterval(interval)
    }
  })
  return (
    <div
      className='App'
      style={{
        backgroundImage: `url(${imgArr[imgIndex]})`,
        transition: '1.5s ease-in',
      }}
    >
      <ToastContainer autoClose={2000} />
      <Nav {...props} />
      <div className='container body-content'>{routes}</div>
    </div>
  )
}

export default withRouter(App)
