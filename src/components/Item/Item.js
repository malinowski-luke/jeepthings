import React, { useState, useEffect } from 'react'
import GoogleMapReact from 'google-map-react'
import Geocode from 'react-geocode'
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

    console.log(post)
  }, [post])
  return (
    <div className='Item'>
      <div className='item-container'>
        <div className='item-map background'>
          <GoogleMapReact
            bootstrapURLKeys={{ key: props.apiKey }}
            center={center}
            marker={center}
            defaultZoom={props.zoom}
          ></GoogleMapReact>
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
