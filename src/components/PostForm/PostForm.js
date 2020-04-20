import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import {
  addPost,
  updatePost,
  getCurrentPost,
  clearPostReducer,
} from '../../redux/postReducer'

import { newPostMassEmail } from '../../redux/emailReducer'
import states from './States.js'
import defaultImg from '../../assets/default.png'
import { toast } from 'react-toastify'
import toastSettingObj from '../utils/custom-toast/toastSettingObj'
import Upload from '../Upload/Upload'
import { slideDown } from '../utils/animations'
import { Container, Button, Row, Col, Form, Image } from 'react-bootstrap'
import './PostForm.scss'

function PostForm(props) {
  const [formValues, setFormValues] = useState({
    title: '',
    price: 0,
    content: '',
    img: '',
    city: '',
    state: '',
  })
  const resetForm = () => {
    setFormValues({
      title: '',
      price: 0,
      content: '',
      img: '',
      city: '',
      state: '',
    })
  }
  const addPost = () => {
    for (let key in formValues) {
      if (key !== 'img' && formValues[key] == false)
        return toast('please fill out the required fields', toastSettingObj)
    }
    const { user_id } = props.user
    props.addPost({
      ...formValues,
      title: formValues.title.toLowerCase(),
      content: formValues.content.toLowerCase(),
      user_id,
    })
    props.newPostMassEmail({
      user_name: props.user.user_name,
      profile_img: props.user.profile_img,
      title: formValues.title,
      img: formValues.img,
    })
    props.history.push('/posts')
  }
  const editPost = () => {
    props.updatePost(post_id, {
      ...formValues,
      title: formValues.title.toLowerCase(),
      content: formValues.content.toLowerCase(),
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
    slideDown('post-form')
  })
  return (
    <div className='PostForm'>
      <Container className='custom-card animation-container' id='post-form'>
        <div style={{ width: 'inherit' }}>
          <Row className='align-items-center'>
            <Col lg={6} className='text-center mb-5 mb-md-3 mb-lg-0'>
              <Image
                src={formValues.img || defaultImg}
                alt='post img'
                className='mb-2'
                style={{ width: 'inherit' }}
              />
              <Upload formValues={formValues} setFormValues={setFormValues} />
            </Col>
            <Col lg={6}>
              <Form.Row classname='mt-4 mt-lg-0'>
                <Form.Group as={Col}>
                  <Form.Label>Post Title</Form.Label>
                  <Form.Control
                    value={formValues.title}
                    type='text'
                    placeholder='Enter Post Title...'
                    onChange={(e) =>
                      setFormValues({ ...formValues, title: e.target.value })
                    }
                    required
                  />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Price$</Form.Label>
                  <Form.Control
                    value={formValues.price}
                    type='number'
                    placeholder='$'
                    min={0}
                    onChange={(e) =>
                      setFormValues({ ...formValues, price: e.target.value })
                    }
                    required
                  />
                </Form.Group>
              </Form.Row>
              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as='textarea'
                  rows='3'
                  value={formValues.content}
                  placeholder='item description'
                  onChange={(e) =>
                    setFormValues({ ...formValues, content: e.target.value })
                  }
                  required
                />
              </Form.Group>
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    value={formValues.city}
                    type='text'
                    placeholder='city'
                    onChange={(e) =>
                      setFormValues({ ...formValues, city: e.target.value })
                    }
                    required
                  />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    as='select'
                    value={formValues.state}
                    onChange={(e) =>
                      setFormValues({ ...formValues, state: e.target.value })
                    }
                    required
                  >
                    <option value=''>State</option>
                    {states}
                  </Form.Control>
                </Form.Group>
              </Form.Row>
              <Row>
                <Col>
                  <Button
                    type='reset'
                    onClick={() => {
                      resetForm()
                      props.clearPostReducer()
                      props.history.push('/posts')
                    }}
                    size='lg'
                    className='buttons'
                    block
                  >
                    cancel
                  </Button>
                </Col>
                <Col>
                  {post_id ? (
                    <Button
                      className='buttons'
                      onClick={() => editPost()}
                      size='lg'
                      block
                    >
                      save
                    </Button>
                  ) : (
                    <Button
                      className='buttons'
                      size='lg'
                      onClick={() => addPost()}
                      block
                    >
                      post
                    </Button>
                  )}
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  )
}

const mapStateToProps = (reduxState) => {
  const { user } = reduxState.userReducer,
    { post, posts } = reduxState.postReducer
  return { user, post, posts }
}

const mapDispatchToProps = {
  addPost,
  updatePost,
  getCurrentPost,
  clearPostReducer,
  newPostMassEmail,
}

export default connect(mapStateToProps, mapDispatchToProps)(PostForm)

{
  /*


<select
  value={formValues.state}
  onChange={(e) =>
    setFormValues({ ...formValues, state: e.target.value })
  }
  required
>
  <option value=''>state</option>
  {states}
</select>
<div className='form-button-container'>

</div>
</form>
</div> */
}
