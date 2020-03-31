import React from 'react'
import defaultImg from '../../assets/default.png'
import './DisplayPost.scss'

function DisplayPost(props) {
  return (
    <div className='DisplayPost'>
      <div className='display-post-content'>
        <img
          src={props.img || defaultImg}
          alt='item img'
          className='display-post-img'
        />
        <div>
          <h1 className='display-post-text'>{props.title}</h1>
          <h1 className='display-post-text price'>${props.price}</h1>
        </div>
      </div>
    </div>
  )
}

export default DisplayPost
