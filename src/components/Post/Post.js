import React, { useState, useEffect } from 'react'
import GoogleMapReact from 'google-map-react'
import Geocode from 'react-geocode'
import Marker from '../Marker/Marker'
import MsgPopup from '../MsgPopup/MsgPopup'
import defaultImg from '../../assets/default.png'
import { connect } from 'react-redux'
import { deletePost, getCurrentPost } from '../../redux/postReducer'
import { clearEmailReducer } from '../../redux/emailReducer'
import { ToastContainer, toast } from 'react-toastify'
import { slideDown } from '../utils/animations'
import 'react-toastify/dist/ReactToastify.css'
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
  const [showPopup, setShowPopup] = useState(false)
  const { post_id } = props.match.params
  const map = () => {
    if (!center.lat && props.post.state) {
      Geocode.fromAddress(`${props.post.city} ${props.post.state}`)
        .then(res => {
          const { lat, lng } = res.results[0].geometry.location
          setCenter({ lat, lng })
        })
        .catch(err => console.log(err))
    }
  }
  const emailPopup = () => {
    if (props.toastMsg) {
      if (props.toastMsg.substring(0, 5) === 'email') {
        toast.success(props.toastMsg, {
          position: toast.POSITION.BOTTOM_RIGHT
        })
      } else {
        toast.error(props.toastMsg, {
          position: toast.POSITION.BOTTOM_RIGHT
        })
      }
      props.clearEmailReducer()
    }
  }
  useEffect(() => {
    props.getCurrentPost(+post_id)
    slideDown('post')
  }, [post_id])
  map()
  emailPopup()
  return (
    <div className='Post'>
      <div className='post-container' id='post'>
        <div className='post-user-profile-container'>
          <img
            src={props.post.profile_img}
            alt={`user profile img${props.post.user_name}`}
            className='posted-user-profile-img'
          />
          <h3>{props.post.user_name}</h3>
        </div>
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
          {props.user.user_name &&
          props.user.user_name !== props.post.user_name ? (
            <button onClick={() => setShowPopup(true)}>MSG</button>
          ) : null}
          {props.user.user_name &&
          props.post.author_id === props.user.user_id ? (
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
          ) : null}
        </div>
      </div>
      {showPopup ? <MsgPopup setShowPopup={setShowPopup} /> : null}
      <ToastContainer autoClose={3000} />
    </div>
  )
}

const mapStateToProps = reduxState => {
  const { user } = reduxState.userReducer,
    { post } = reduxState.postReducer,
    { toastMsg } = reduxState.emailReducer
  return { user, post, toastMsg }
}

const mapDispatchToProps = {
  deletePost,
  getCurrentPost,
  clearEmailReducer
}

export default connect(mapStateToProps, mapDispatchToProps)(Item)
