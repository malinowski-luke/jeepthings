import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { getAllUserPosts } from '../../redux/userReducer'
import { toast, ToastContainer } from 'react-toastify'
import './Post.css'
import DisplayPost from '../DisplayPost/DisplayPost'
import { Link } from 'react-router-dom'

function Post(props) {
  const [serachText, setSearchText] = useState('')
  const [userPostBool, setUserPostBool] = useState(false)
  const [postsArr, setPosts] = useState([])

  useEffect(() => {
    const ref = useRef
    ref.current = props.posts
    const { posts } = props
    console.log(ref.current.length, posts.length) //test
    if (ref.current.length === 0 || ref.current.length !== posts.length) {
      props.getAllUserPosts()
    }
    if (userPostBool) setPosts([...filterUserPosts()])
    else setPosts([...posts])
    console.log(ref.current.length, posts.length) //test
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
      return postsArr.filter(elm => elm.title.includes(serachText))
  }
  const resetFilterVars = () => {
    setSearchText('')
    setUserPostBool(false)
    setPosts([...props.posts])
  }
  const postDisplayArr = postsArr.map(elm => {
    return (
      <Link
        key={elm.post_id}
        to={`/item/${props.user.user_id}/${elm.post_id}`}
        className='Link'
      >
        <DisplayPost title={elm.title} price={elm.price} img={elm.img} />
      </Link>
    )
  })
  return (
    <div className='Post'>
      <form
        onSubmit={e => e.preventDefault()}
        className='post-container post-filter'
      >
        <div className='post-input-container'>
          <select
            onChange={e => {
              setPosts([...filterByPrice(e.target.value)])
            }}
          >
            <option value=''>filter by price</option>
            <option value='min'>low to high</option>
            <option value='max'>high to low</option>
          </select>
          <input
            value={serachText}
            placeholder='jk shark grill'
            onChange={e => setSearchText(e.target.value)}
          />
        </div>
        <div className='post-button-container'>
          <button
            className='post-button'
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
            className='post-button'
            type='reset'
            onClick={() => {
              setPosts([...props.posts])
              resetFilterVars()
            }}
          >
            clear
          </button>
          <span>
            <label>my posts</label>
            <input
              onChange={() => {
                setUserPostBool(!userPostBool)
              }}
              type='checkbox'
            />
          </span>
        </div>
        <Link to='/form'>
          <button className='post-button post-item-button'>Post Item</button>
        </Link>
      </form>
      <div className='post-container'>{postDisplayArr}</div>
      <ToastContainer autoClose={2000} />
    </div>
  )
}

const mapStateToProps = reduxState => {
  const { posts, user } = reduxState
  return { posts, user }
}

const mapDispatchToProps = {
  getAllUserPosts
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)
