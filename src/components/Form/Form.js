import React, { useState } from 'react'
import { connect } from 'react-redux'
import { addPost } from '../../redux/userReducer'
import states from './States.js'
import defaultImg from '../../assets/default.png'
import { toast, ToastContainer } from 'react-toastify'
import './Form.css'

function Form(props) {
  const [post, setPost] = useState({
    title: '',
    price: 0,
    content: '',
    img: '',
    city: '',
    state: ''
  })
  const resetForm = () => {
    setPost({
      title: '',
      price: 0,
      content: '',
      img: '',
      city: '',
      state: ''
    })
  }
  // useEffect(() => {}, [props.user_id])
  return (
    <div className='Form'>
      <div className='form-container'>
        <div>
          <h1 className='form-header'>Post</h1>
          <img
            src={post.img || defaultImg}
            alt='post img'
            className='form-img'
          />
        </div>
        <form onSubmit={e => e.preventDefault()}>
          <div className='form-input-container'>
            <input
              value={post.title}
              type='text'
              placeholder='title'
              onChange={e => setPost({ ...post, title: e.target.value })}
              required
            />
            <input
              value={post.price}
              type='number'
              placeholder='price'
              onChange={e => setPost({ ...post, price: e.target.value })}
              required
            />
            <textarea
              value={post.content}
              placeholder='item description'
              onChange={e => setPost({ ...post, content: e.target.value })}
              required
            ></textarea>
            <input
              value={post.img}
              type='text'
              placeholder='img path'
              onChange={e => setPost({ ...post, img: e.target.value })}
            />
            <div className='form-location-container'>
              <input
                value={post.city}
                type='text'
                placeholder='city'
                onChange={e => setPost({ ...post, city: e.target.value })}
                required
              />
              <select
                onChange={e => setPost({ ...post, state: e.target.value })}
                required
              >
                <option value=''>state</option>
                {states}
              </select>
            </div>
            <div className='form-button-container'>
              <button
                type='reset'
                onClick={() => {
                  resetForm()
                  props.history.push('/post')
                }}
              >
                cancel
              </button>
              <button
                onClick={() => {
                  for (let key in post) {
                    if (key !== 'img' && post[key] == false)
                      return toast.error(
                        'please fill out the required fields',
                        {
                          position: toast.POSITION.BOTTOM_RIGHT
                        }
                      )
                  }
                  const { user_id } = props.user
                  props.addPost({ ...post, user_id })
                  props.history.push('/post')
                }}
              >
                post
              </button>
            </div>
          </div>
        </form>
      </div>
      <ToastContainer autoClose={2000} />
    </div>
  )
}

const mapStateToProps = reduxState => {
  const { user } = reduxState
  return { user }
}

export default connect(mapStateToProps, { addPost })(Form)
