import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { updateProfileImg } from '../../redux/userReducer'
import Upload from '../Upload/Upload'
import { slideDown } from '../utils/animations'
import './Profile.scss'
import { Container, Row, Col, Image } from 'react-bootstrap'

function Profile(props) {
  useEffect(() => {
    slideDown('profile')
  }, [])
  const { user, updateProfileImg } = props
  return (
    <div className='Profile'>
      <Container className=' custom-card animation-container' id='profile'>
        <h1 classname='text-center'>Profile</h1>
        <div style={{ width: 'inherit' }}>
          <Row className='text-center mt-4 align-items-center'>
            <Col lg={6}>
              <Image
                src={user.profile_img}
                alt={`profile pic ${user.user_name}`}
                className='frame mb-4'
                style={{ width: 'inherit' }}
                fluid
              />
              <Upload
                user_id={user.user_id}
                updateProfileImg={updateProfileImg}
              />
            </Col>
            <Col lg={6} className='mt-4 mt-lg-0'>
              <h2>Email:</h2>
              <p>{user.user_name}</p>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  )
}

const mapStateToProps = (reduxState) => {
  const { user } = reduxState.userReducer
  return { user }
}

export default connect(mapStateToProps, { updateProfileImg })(Profile)
