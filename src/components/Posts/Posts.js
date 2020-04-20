import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { getAllUserPosts } from '../../redux/postReducer'
import { toast } from 'react-toastify'
import toastSettingObj from '../utils/custom-toast/toastSettingObj'
import './Posts.scss'
import DisplayPost from '../DisplayPost/DisplayPost'
import { slideDown } from '../utils/animations'
import { Link } from 'react-router-dom'
import { Form, Button, Col, Container } from 'react-bootstrap'

function Posts(props) {
  const [serachText, setSearchText] = useState('')
  const [userPostBool, setUserPostBool] = useState(false)
  const [postsArr, setPosts] = useState([])
  useEffect(() => {
    const ref = useRef //allows to save prev props
    ref.current = postsArr // setting prev props
    const { posts } = props
    //console.log(ref.current.length, posts.length) //test
    if (ref.current.length === 0 || ref.current.length !== posts.length) {
      props.getAllUserPosts()
    }
    if (userPostBool) setPosts([...filterUserPosts()])
    else setPosts([...posts])
    //console.log(ref.current.length, posts.length) //test
    slideDown('posts')
  }, [props.posts, userPostBool])
  const filterByPrice = (filterVar) => {
    return postsArr.sort((a, b) => {
      return filterVar === 'max' ? b.price - a.price : a.price - b.price
    })
  }
  const filterUserPosts = () => {
    if (userPostBool)
      return postsArr.filter((elm) => props.user.user_id === elm.author_id)
    else return [...props.posts]
  }
  const filterByKeyword = () => {
    if (serachText !== '')
      return postsArr.filter((elm) =>
        elm.title.includes(serachText.toLowerCase())
      )
  }
  const resetFilterVars = () => {
    setSearchText('')
    setUserPostBool(false)
    setPosts([...props.posts])
  }
  const postDisplayArr = postsArr.map((elm) => {
    return (
      <Link key={elm.post_id} to={`/post/${elm.post_id}`} className='Link'>
        <DisplayPost title={elm.title} price={elm.price} img={elm.img} />
      </Link>
    )
  })
  return (
    <div className='Posts'>
      <Container id='posts' className='custom-card animation-continer'>
        <Form style={{ width: 'inherit' }}>
          <Form.Row>
            <Form.Group as={Col} md='2'>
              <Form.Control
                as='select'
                custom
                onChange={(e) => {
                  setPosts([...filterByPrice(e.target.value)])
                }}
              >
                <option value=''>filter by price</option>
                <option value='min'>low to high</option>
                <option value='max'>high to low</option>
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col} sm='6'>
              <Form.Control
                value={serachText}
                placeholder='Enter keyword'
                onChange={(e) => setSearchText(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Button
                size='sm'
                type='submit'
                onClick={() => {
                  if (serachText === '')
                    toast('please enter a keyword', toastSettingObj)
                  else setPosts([...filterByKeyword()])
                }}
                className='buttons'
                block
              >
                Submit
              </Button>
            </Form.Group>
            <Form.Group as={Col}>
              <Button
                size='sm'
                variant='primary'
                type='reset'
                onClick={() => {
                  setPosts([...props.posts])
                  resetFilterVars()
                }}
                className='buttons'
                block
              >
                Clear
              </Button>
            </Form.Group>
            {props.user.user_name ? (
              <>
                <Form.Group as={Col}>
                  <Link to='/form'>
                    <Button block size='sm' className='buttons'>
                      Post
                    </Button>
                  </Link>
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Check
                    type='checkbox'
                    label='My posts'
                    onChange={() => {
                      setUserPostBool(!userPostBool)
                    }}
                  />
                </Form.Group>
              </>
            ) : (
              <></>
            )}
          </Form.Row>
        </Form>
        <div>{postDisplayArr}</div>
      </Container>
    </div>
  )
}

const mapStateToProps = (reduxState) => {
  const { user } = reduxState.userReducer,
    { posts } = reduxState.postReducer
  return { user, posts }
}

const mapDispatchToProps = {
  getAllUserPosts,
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts)
