import React, { useState, useEffect } from 'react'
import GoogleMapReact from 'google-map-react'
import Geocode from 'react-geocode'
import Marker from '../Marker/Marker'
import defaultImg from '../../assets/default.png'
import { connect } from 'react-redux'
import { deletePost, getCurrentPost } from '../../redux/postReducer'
import './Post.scss'

//default props
Item.defaultProps = {
  zoom: 12,
  apiKey: 'AIzaSyBQuVmUSMvXSooCt0trsurxhelMeWGVeZE'
}

function Item(props) {
  Geocode.setApiKey(props.apiKey)
  Geocode.setLanguage('en')
  Geocode.enableDebug()
  const [center, setCenter] = useState({ lat: null, lng: null })
  const { post_id } = props.match.params
  useEffect(() => {
    props.getCurrentPost(+post_id)
  }, [post_id])
  if (!center.lat && props.post.state) {
    Geocode.fromAddress(`${props.post.city} ${props.post.state}`)
      .then(res => {
        const { lat, lng } = res.results[0].geometry.location
        // console.log(lat, lng) test
        setCenter({ lat, lng })
      })
      .catch(err => console.log(err))
  }
  return (
    <div className='Post'>
      <div className='post-container'>
        <div className='post-flex-container'>
          <h1>{props.post.title}</h1>
          <h1>${props.post.price}</h1>
        </div>
        <div className='post-flex-container'>
          <p>{props.post.content}</p>
        </div>
        <img src={props.post.img || defaultImg} className='post-map-img' />
        <h1 className='post-location'>Location: {props.post.city}</h1>
        <div className='post-map-img'>
          <GoogleMapReact
            bootstrapURLKeys={{ key: props.apiKey }}
            center={center}
            defaultZoom={props.zoom}
          >
            <Marker lat={center.lat} lng={center.lng} />
          </GoogleMapReact>
        </div>
        <div className='post-flex-container'>
          <button onClick={() => props.history.push('/posts')}>back</button>
          {props.user.user_name?<button>MSG</button>:null}
          {props.post.author_id === props.user.user_id ? (
            <>
              <button
                onClick={() => {
                  props.deletePost(props.match.params.post_id)
                  props.history.push('/posts')
                }}
              >
                del
              </button>
              <button
                onClick={() => {
                  props.history.push(`/form/${props.match.params.post_id}`)
                }}
              >
                edit
              </button>
            </>
          ) : (
            null
          )}
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = reduxState => {
  const { user } = reduxState.userReducer,
    { post } = reduxState.postReducer
  return { user, post }
}

const mapDispatchToProps = {
  deletePost,
  getCurrentPost
}

export default connect(mapStateToProps, mapDispatchToProps)(Item)
