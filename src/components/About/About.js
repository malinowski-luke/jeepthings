import React,{useEffect} from 'react'
import Carousel from 'react-material-ui-carousel'
import './About.scss'

export default function About() {
  useEffect(()=>{
     const slidedownForm = document.getElementById("about")
      if (slidedownForm) {
        slidedownForm.style.animation = "slideDownAbout 0.5s ease-out forwards"
        slidedownForm.classList.add("fade-in-about")
      }
  },[])
  const imgPaths =[
    'https://jeepthings-img-bucket.s3.amazonaws.com/855f5f39-3d31-4226-a359-0409d6c71a4a-jeep.jpg',
    'https://jeepthings-img-bucket.s3.amazonaws.com/6856e84f-0041-42d8-925f-52ab30404e7d-jeepRed.jpg',
    'https://jeepthings-img-bucket.s3.amazonaws.com/cf26bbbd-aefc-4b90-8ad5-7172f633a4b2-jeep-orange.jpg',
  ]
  const carouselImages = imgPaths.map((elm,index)=>{
      return   <img key={index} src={elm} alt='about page img'/>
  })
  return (
    <div className='About'>
      <div className='about-container' id='about'>
        <h1>about</h1>
        <Carousel autoPlay indicators animation={'fade'} interval={7000}>
            {carouselImages}
        </Carousel>
        <p>
          This project started off as a clone of craigslist with a jeep twist. 
          Where fellow jeep people could post 
          parts for sale with less creeps around (sorry craigslist is for creeps and nigerian princes). The goal of this project was to build an app with the same functiality as craigslist but, with better css.
        </p>
      </div>
    </div>
  )
}
