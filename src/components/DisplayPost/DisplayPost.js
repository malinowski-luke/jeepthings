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
         <h1>{props.title}</h1>
          <h1>${props.price}</h1>
        </Col>
      </Row>
    </div>
  )
}

export default DisplayPost
