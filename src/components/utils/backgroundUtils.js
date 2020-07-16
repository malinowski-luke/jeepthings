import img1 from '../../assets/img1.jpg'
import img2 from '../../assets/img2.jpg'
import img3 from '../../assets/img3.jpg'
import img4 from '../../assets/img4.jpg'

export const imgArr = [img1, img2, img3, img4]
export const randomIndex = () => Math.floor(Math.random() * (imgArr.length - 1))
