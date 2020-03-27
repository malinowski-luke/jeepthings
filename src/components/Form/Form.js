import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import {
  addPost,
  updatePost,
  getCurrentPost,
  clearPostReducer
} from '../../redux/postReducer'

import { newPostMassEmail } from '../../redux/emailReducer'
import states from './States.js'
import defaultImg from '../../assets/default.png'
import { toast, ToastContainer } from 'react-toastify'
import Upload from '../Upload/Upload'
import { slideDown } from '../utils/animations'
import './Form.scss'

function Form(props) {
  const [formValues, setFormValues] = useState({
    title: '',
    price: 0,
    content: '',
    img: '',
    city: '',
    state: ''
  })
  const resetForm = () => {
    setFormValues({
      title: '',
      price: 0,
      content: '',
      img: '',
      city: '',
      state: ''
    })
  }
  const addPost = () => {
    for (let key in formValues) {
      if (key !== 'img' && formValues[key] == false)
        return toast.error('please fill out the required fields', {
          position: toast.POSITION.BOTTOM_RIGHT
        })
    }
    const { user_id } = props.user
    props.addPost({
      ...formValues,
      title: formValues.title.toLowerCase(),
      content: formValues.content.toLowerCase(),
      user_id
    })
    props.newPostMassEmail({
      user_name: props.user.user_name,
      profile_img: props.user.profile_img,
      title: formValues.title,
      img: formValues.img
    })
    props.history.push('/posts')
  }
  const editPost = () => {
    props.updatePost(post_id, {
      ...formValues,
      title: formValues.title.toLowerCase(),
      content: formValues.content.toLowerCase()
    })
    props.clearPostReducer()
    props.history.push(`/post/${post_id}`)
  }
  const { post_id } = props.match.params,
    { post } = props
  useEffect(() => {
    if (post_id) {
      props.getCurrentPost(post_id)
      setFormValues({ ...post })
    } else props.clearPostReducer()
    slideDown('form')
  }, [])
  return (
    <div className='Form'>
      <div className='form-container' id='form'>
        <img
          src={formValues.img || defaultImg}
          alt='post img'
          className='form-img'
        />
        <form onSubmit={e => e.preventDefault()}>
          <div className='upload-container'>
            <Upload formValues={formValues} setFormValues={setFormValues} />
          </div>
          <input
            type='text'
            placeholder='title'
            onChange={e =>
              setFormValues({ ...formValues, title: e.target.value })
            }
            required
          />
          <input
            value={formValues.price}
            type='number'
            placeholder='price'
            min={0}
            onChange={e =>
              setFormValues({ ...formValues, price: e.target.value })
            }
            required
          />
          <textarea
            value={formValues.content}
            placeholder='item description'
            onChange={e =>
              setFormValues({ ...formValues, content: e.target.value })
            }
            required
          ></textarea>
          <input
            value={formValues.city}
            type='text'
            placeholder='city'
            onChange={e =>
              setFormValues({ ...formValues, city: e.target.value })
            }
            required
          />
          <select
            value={formValues.state}
            onChange={e =>
              setFormValues({ ...formValues, state: e.target.value })
            }
            required
          >
            <option value=''>state</option>
            {states}
          </select>
          <div className='form-button-container'>
            <button
              type='reset'
              onClick={() => {
                resetForm()
                props.clearPostReducer()
                props.history.push('/posts')
              }}
            >
              cancel
            </button>
            {post_id ? (
              <button onClick={() => editPost()}>save</button>
            ) : (
              <button onClick={() => addPost()}>post</button>
            )}
          </div>
        </form>
      </div>
      <ToastContainer autoClose={2000} />
    </div>
  )
}

const mapStateToProps = reduxState => {
  const { user } = reduxState.userReducer,
    { post, posts } = reduxState.postReducer
  return { user, post, posts }
}

const mapDispatchToProps = {
  addPost,
  updatePost,
  getCurrentPost,
  clearPostReducer,
  newPostMassEmail
}

export default connect(mapStateToProps, mapDispatchToProps)(Form)
