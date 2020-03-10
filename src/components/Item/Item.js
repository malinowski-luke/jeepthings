import React, { useState, useEffect } from 'react'
import GoogleMapReact from 'google-map-react'
import Geocode from 'react-geocode'
import Marker from '../Marker/Marker'
import defaultImg from '../../assets/default.png'
import { connect } from 'react-redux'
import { deletePost } from '../../redux/userReducer'
import './Item.css'

//default props
Item.defaultProps = {
  zoom: 12,
  apiKey: 'AIzaSyBQuVmUSMvXSooCt0trsurxhelMeWGVeZE'
}

function Item(props) {
  Geocode.setApiKey(props.apiKey)
  Geocode.setLanguage('en')
  Geocode.enableDebug()
  const [post, setPost] = useState({})
  const [center, setCenter] = useState({})
  useEffect(() => {
    const { posts } = props
    const { post_id } = props.match.params
    if (!post.author_id) {
      const postIndex = posts.findIndex(elm => elm.post_id === +post_id)
      setPost({ ...props.posts[postIndex] })
    }
    if (post.city && post.state) {
      Geocode.fromAddress(`${post.city} ${post.state}`)
        .then(res => {
          const { lat, lng } = res.results[0].geometry.location
          setCenter({ lat, lng })
        })
        .catch(err => console.log(err))
    }
  }, [post])
  return (
    <div className='Item'>
      <div className='item-container'>
        <div className='item-flex-container'>
          <h1>{post.title}</h1>
          <h1>${post.price}</h1>
        </div>
        <div className='item-flex-container'>
          <p>{post.content}</p>
        </div>
        <img src={post.img || defaultImg} className='item-map-img' />
        <h1 className='item-location'>Location: {post.city}</h1>
        <div className='item-map-img'>
          <GoogleMapReact
            bootstrapURLKeys={{ key: props.apiKey }}
            center={center}
            defaultZoom={props.zoom}
          >
            <Marker lat={center.lat} lng={center.lng} />
          </GoogleMapReact>
        </div>
        <div className='item-flex-container'>
          {post.author_id === props.user.user_id ? (
            <>
              <button
                onClick={() => {
                  props.deletePost(props.match.params.post_id)
                  props.history.push('/post')
                }}
              >
                delete
              </button>
              <button>edit</button>
            </>
          ) : (
            <></>
          )}
          <button>msg</button>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = reduxState => {
  const { user, posts } = reduxState
  return { user, posts }
}

export default connect(mapStateToProps, { deletePost })(Item)
