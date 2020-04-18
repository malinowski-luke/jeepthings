import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import routes from './routes'
import img1 from './assets/img1.jpg'
import img2 from './assets/img2.jpg'
import img3 from './assets/img3.jpg'
import img4 from './assets/img4.jpg'
import Nav from './components/Nav/Nav'
import { ToastContainer } from 'react-toastify'
import './App.scss'

function App(props) {
  const imgArr = [img1, img2, img3, img4]
  const randomIndex = () => Math.floor(Math.random() * (imgArr.length - 1))
  let [imgIndex, setImgIndex] = useState(randomIndex())
  useEffect(() => {
    const interval = setInterval(() => setImgIndex(randomIndex()), 30000)
    return () => {
      return clearInterval(interval)
    }
  })
  return (
    <div
      className='App'
      style={{
        backgroundImage: `url(${imgArr[imgIndex]})`,
        transition: '1.5s',
      }}
    >
      <ToastContainer autoClose={2000} />
      <Nav {...props} />
      <div className='container body-content'>{routes}</div>
    </div>
  )
}

export default withRouter(App)
