import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import {
  addPost,
  updatePost,
  getCurrentPost,
  clearPostReducer
} from '../../redux/postReducer'
import states from './States.js'
import defaultImg from '../../assets/default.png'
import { toast, ToastContainer } from 'react-toastify'
import Upload from '../Upload/Upload'
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
  const { post_id } = props.match.params,
   { post } = props
  useEffect(() => {
    if (post_id) {
      props.getCurrentPost(post_id)
      setFormValues({ ...post })
    } else  props.clearPostReducer()
    // console.log(post_id)
    // console.log(post)
    // console.log(formValues)
  }, [])
  return (
    <div className='Form'>
      <div className='form-container'>
        <div>
          <h1 className='form-header'>
            {post_id ? 'edit post' : 'create post'}
          </h1>
          <img
            src={formValues.img || defaultImg}
            alt='post img'
            className='form-img'
          />
        </div>
        <form onSubmit={e => e.preventDefault()}>
          <div className='form-input-container'>
            <Upload formValues={formValues} setFormValues={setFormValues}/>
            <input
              value={formValues.title}
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
            <div className='form-location-container'>
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
            </div>
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
                <button
                  onClick={() => {
                    console.log(formValues)
                    props.updatePost(post_id, {...formValues})
                    props.clearPostReducer()
                    props.history.push(`/post/${post_id}`)
                  }}
                >
                  save
                </button>
              ) : (
                <button
                  onClick={() => {
                    for (let key in formValues) {
                      if (key !== 'img' && formValues[key] == false )
                        return toast.error(
                          'please fill out the required fields',
                          {
                            position: toast.POSITION.BOTTOM_RIGHT
                          }
                        )
                    }
                    const { user_id } = props.user
                    props.addPost({ ...formValues, user_id })
                    props.history.push('/posts')
                  }}
                >
                  post
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
      <ToastContainer autoClose={2000} />
    </div>
  )
}

const mapStateToProps = reduxState => {
  const { user } = reduxState.userReducer,
    { post } = reduxState.postReducer
  return { user, post }
}

const mapDispatchToProps = {
  addPost,
  updatePost,
  getCurrentPost,
  clearPostReducer
}

export default connect(mapStateToProps, mapDispatchToProps)(Form)
