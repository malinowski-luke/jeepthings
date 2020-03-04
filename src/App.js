import React, { useState, useEffect } from 'react'
import routes from './routes'
import { withRouter } from 'react-router-dom'
import img1 from './assets/img1.jpg'
import img2 from './assets/img2.jpg'
import img3 from './assets/img3.jpg'
import img4 from './assets/img4.jpg'
import './App.css'

function App() {
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
      {routes}
    </div>
  )
}

export default withRouter(App)
