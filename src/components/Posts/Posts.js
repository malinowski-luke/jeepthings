import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { getAllUserPosts } from '../../redux/postReducer'
import { toast, ToastContainer } from 'react-toastify'
import './Posts.scss'
import DisplayPost from '../DisplayPost/DisplayPost'
import { slideDown } from '../utils/animations'
import { Link } from 'react-router-dom'

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
  const filterByPrice = filterVar => {
    return postsArr.sort((a, b) => {
      return filterVar === 'max' ? b.price - a.price : a.price - b.price
    })
  }
  const filterUserPosts = () => {
    if (userPostBool)
      return postsArr.filter(elm => props.user.user_id === elm.author_id)
    else return [...props.posts]
  }
  const filterByKeyword = () => {
    if (serachText !== '')
      return postsArr.filter(elm =>
        elm.title.includes(serachText.toLowerCase())
      )
  }
  const resetFilterVars = () => {
    setSearchText('')
    setUserPostBool(false)
    setPosts([...props.posts])
  }
  const postDisplayArr = postsArr.map(elm => {
    return (
      <Link key={elm.post_id} to={`/post/${elm.post_id}`} className='Link'>
        <DisplayPost title={elm.title} price={elm.price} img={elm.img} />
      </Link>
    )
  })
  return (
    <div className='Posts'>
      <div id='posts' className='posts-animation-container'>
        <form
          onSubmit={e => e.preventDefault()}
          className='posts-container posts-filter'
        >
          <input
            value={serachText}
            placeholder='search keyword'
            onChange={e => setSearchText(e.target.value)}
            required
          />
          <div className='posts-search-container'>
            <select
              onChange={e => {
                setPosts([...filterByPrice(e.target.value)])
              }}
            >
              <option value=''>filter by price</option>
              <option value='min'>low to high</option>
              <option value='max'>high to low</option>
            </select>
            <button
              className='posts-button'
              type='submit'
              onClick={() => {
                if (serachText === '') {
                  toast.error('please enter a keyword', {
                    position: toast.POSITION.BOTTOM_RIGHT
                  })
                } else setPosts([...filterByKeyword()])
              }}
            >
              search
            </button>
            <button
              className='posts-button'
              type='reset'
              onClick={() => {
                setPosts([...props.posts])
                resetFilterVars()
              }}
            >
              clear
            </button>
          </div>
          {props.user.user_name ? (
            <div className='posts-user-option-container'>
              <span>
                <label>my posts</label>
                <input
                  onChange={() => {
                    setUserPostBool(!userPostBool)
                  }}
                  type='checkbox'
                />
              </span>
              <Link to='/form'>
                <button className='posts-button posts-item-button'>
                  Post Item
                </button>
              </Link>
            </div>
          ) : (
            <></>
          )}
        </form>
        <div className='posts-container'>{postDisplayArr}</div>
      </div>
      <ToastContainer autoClose={2000} />
    </div>
  )
}

const mapStateToProps = reduxState => {
  const { user } = reduxState.userReducer,
    { posts } = reduxState.postReducer
  return { user, posts }
}

const mapDispatchToProps = {
  getAllUserPosts
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts)
