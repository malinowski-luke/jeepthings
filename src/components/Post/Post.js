import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { getAllUserPosts } from '../../redux/userReducer'
import './Post.css'

function Post(props) {
  const [serachText, setSearchText] = useState('')
  const [userPostBool, setUserPostBool] = useState(false)
  const [priceFilter, setPriceFilter] = useState('')
  const resetFilterVars = () => {
    setSearchText('')
    setUserPostBool(false)
    setPriceFilter('')
  }
  useEffect(() => {
    if (props.posts.length === 0) props.getAllUserPosts()
  }, [props.posts])
  console.log(serachText, userPostBool, priceFilter)
  return (
    <div className='Post'>
      <div className='post-container post-filter'>
        <div className='post-input-container'>
          <select onChange={e => setPriceFilter(e.target.value)}>
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
          <button className='post-button'>search</button>
          <button
            className='post-button'
            onClick={() => {
              resetFilterVars()
            }}
          >
            clear
          </button>
          <span>
            <label>my posts</label>
            <input
              onChange={() => setUserPostBool(!userPostBool)}
              type='checkbox'
            />
          </span>
        </div>
        <button className='post-button post-item-button'>Post Item</button>
      </div>
      <div className='post-container'></div>
    </div>
  )
}

const mapStateToProps = reduxState => {
  const { posts } = reduxState
  return { posts }
}

const mapDispatchToProps = {
  getAllUserPosts
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)
