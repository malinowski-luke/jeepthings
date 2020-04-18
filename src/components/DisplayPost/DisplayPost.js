import React from 'react'
import defaultImg from '../../assets/default.png'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import './DisplayPost.scss'

function DisplayPost(props) {
  return (
    <div className='DisplayPost'>
      <Row>
        <Col md='4' className='text-left'>
          <Image
            src={props.img || defaultImg}
            alt='item img'
            className='display-post-img'
            fluid
          />
        </Col>
        <Col md='8' className='text-content'>
          <h1 className='post-header'>{props.title}</h1>
          <h2>${props.price}</h2>
        </Col>
      </Row>
    </div>
  )
}

export default DisplayPost
