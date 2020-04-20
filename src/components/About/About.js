import React, { useEffect } from 'react'
import Carousel from 'react-material-ui-carousel'
import { slideDown } from '../utils/animations'
import { Row, Col, Image, Container } from 'react-bootstrap'
import './About.scss'

export default function About() {
  useEffect(() => {
    slideDown('about')
  })
  const imgPaths = [
    'https://jeepthings-img-bucket.s3.amazonaws.com/855f5f39-3d31-4226-a359-0409d6c71a4a-jeep.jpg',
    'https://jeepthings-img-bucket.s3.amazonaws.com/cf26bbbd-aefc-4b90-8ad5-7172f633a4b2-jeep-orange.jpg',
  ]
  const carouselImages = imgPaths.map((elm, index) => {
    return (
      <Image
        key={index}
        src={elm}
        alt='about page img'
        className='frame'
        style={{ width: 'inherit' }}
        fluid
      />
    )
  })
  return (
    <div className='About'>
      <Container className='custom-card animation-container' id='about'>
        <Row className='align-items-center'>
          <Col lg={6}>
            <Carousel autoPlay indicators animation={'fade'} interval={8000}>
              {carouselImages}
            </Carousel>
          </Col>
          <Col lg={6}>
            <h3 className='text-center'>
              This project started off as a clone of craigslist with a jeep
              twist. Where fellow jeep people could post parts for sale with
              less creeps around (sorry craigslist). The goal of this project
              was to build an app with the same functiality as craigslist but,
              with better css.
            </h3>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
