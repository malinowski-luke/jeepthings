import React, { useState, useEffect } from 'react'
import GoogleMapReact from 'google-map-react'
import Geocode from 'react-geocode'
import Marker from '../Marker/Marker'
import MsgPopup from '../MsgPopup/MsgPopup'
import defaultImg from '../../assets/default.png'
import { connect } from 'react-redux'
import {
  deletePost,
  getCurrentPost,
  clearPostReducer,
} from '../../redux/postReducer'
import { clearEmailReducer } from '../../redux/emailReducer'
import { toast } from 'react-toastify'
import { slideDown } from '../utils/animations'
import toastSettingObj from '../utils/custom-toast/toastSettingObj'
import 'react-toastify/dist/ReactToastify.css'
import { Container, Image, Row, Col, Button } from 'react-bootstrap'
import './Post.scss'

//default props
Item.defaultProps = {
  zoom: 12,
  apiKey: 'AIzaSyBQuVmUSMvXSooCt0trsurxhelMeWGVeZE',
}

function Item(props) {
  Geocode.setApiKey(props.apiKey)
  Geocode.setLanguage('en')
  Geocode.enableDebug()
  const [center, setCenter] = useState({ lat: null, lng: null })
  const [showPopup, setShowPopup] = useState(false)
  const { post_id } = props.match.params
  const map = () => {
    Geocode.fromAddress(`${props.post.city} ${props.post.state}`)
      .then((res) => {
        const { lat, lng } = res.results[0].geometry.location
        setCenter({ lat, lng })
      })
      .catch((err) => console.log(err))
  }
  const emailPopup = () => {
    if (props.toastMsg) {
      if (props.toastMsg.substring(0, 5) === 'email')
        toast(props.toastMsg, toastSettingObj)
      else {
        toast.error(props.toastMsg, {
          position: toast.POSITION.TOP_RIGHT,
        })
      }
      props.clearEmailReducer()
    }
  }
  useEffect(() => {
    if (!props.post.title || +post_id !== props.post.post_id)
      props.getCurrentPost(+post_id)
    if (props.post.state || +post_id !== props.post.post_id) map()
    slideDown('post')
  }, [props.post.state])
  emailPopup()
  return (
    <div className='Post'>
      <Container className='custom-card animation-container' id='post'>
        <div style={{ width: 'inherit' }}>
          <Row>
            <Col md={6} className='text-left'>
              <Row className='align-items-center'>
                <Col xs={2} md={3} lg={2}>
                  <Image
                    src={props.post.profile_img}
                    alt={`user profile img${props.post.user_name}`}
                    className='profile-img'
                  />
                </Col>
                <Col xs={4}>
                  <p className='ml-lg-4'>{props.post.user_name}</p>
                </Col>
              </Row>
            </Col>
            <Col md={6} className='post-title mt-2 mt-md-0'>
              <h1>{props.post.title}</h1>
              <h3>${props.post.price}</h3>
            </Col>
          </Row>
          <Row className='text-center align-items-center mt-4'>
            <Col md={6}>
              <h4>
                {props.post.content}
                <br />
                <strong>
                  Location: {props.post.city} {props.post.state}
                </strong>
              </h4>
              <Row className='mt-2 mt-md-4'>
                <Col>
                  <Button
                    onClick={() => {
                      props.history.push('/posts')
                      props.clearPostReducer()
                    }}
                    size='lg'
                    className='buttons'
                    block
                  >
                    back
                  </Button>
                </Col>
                {props.user.user_name &&
                props.user.user_name !== props.post.user_name ? (
                  <Col>
                    <Button
                      onClick={() => setShowPopup(true)}
                      size='lg'
                      className='buttons'
                      block
                    >
                      msg
                    </Button>
                  </Col>
                ) : null}
                {props.user.user_name &&
                props.post.author_id === props.user.user_id ? (
                  <>
                    <Col>
                      <Button
                        onClick={() => {
                          props.deletePost(props.match.params.post_id)
                          props.history.push('/posts')
                        }}
                        size='lg'
                        className='buttons'
                        block
                      >
                        del
                      </Button>
                    </Col>
                    <Col>
                      <Button
                        onClick={() => {
                          props.history.push(
                            `/form/${props.match.params.post_id}`
                          )
                        }}
                        size='lg'
                        className='buttons'
                        block
                      >
                        edit
                      </Button>
                    </Col>
                  </>
                ) : null}
              </Row>
            </Col>
            <Col md={6} className='mt-4 mt-md-0'>
              <Image
                src={props.post.img || defaultImg}
                className='post-img frame'
                alt={`post img ${props.post.title}`}
              />
            </Col>
          </Row>
          <div className='map frame mt-4'>
            <GoogleMapReact
              bootstrapURLKeys={{ key: props.apiKey }}
              center={center}
              defaultZoom={props.zoom}
            >
              <Marker lat={center.lat} lng={center.lng} />
            </GoogleMapReact>
          </div>
        </div>
      </Container>
      {showPopup ? <MsgPopup setShowPopup={setShowPopup} /> : null}
    </div>
  )
}

const mapStateToProps = (reduxState) => {
  const { user } = reduxState.userReducer,
    { post } = reduxState.postReducer,
    { toastMsg } = reduxState.emailReducer
  return { user, post, toastMsg }
}

const mapDispatchToProps = {
  deletePost,
  getCurrentPost,
  clearPostReducer,
  clearEmailReducer,
}

export default connect(mapStateToProps, mapDispatchToProps)(Item)
