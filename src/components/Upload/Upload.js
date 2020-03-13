import React,{useState} from 'react'
import {GridLoader} from 'react-spinners'
import Dropzone from 'react-dropzone'
import {v4 as randomString} from 'uuid'
import axios from 'axios'
import './Upload.scss'

export default function Upload(props) {
  const [isUploading, setIsUploading] = useState(false)
  const {user_id, updateProfileImg, formValues, setFormValues } = props
  const getSignedRequest = ([file]) => {
    setIsUploading(true)
    const fileName = `${randomString()}-${file.name.replace(/\s/g, '-')}`
    axios
      .get('/api/sign-s3', {
        params: {
          'file-name': fileName,
          'file-type': file.type,
        },
      })
      .then(response => {
        const { signedRequest, url } = response.data;
        uploadFile(file, signedRequest, url);
      })
      .catch(err => console.log(err))
  }
  const uploadFile = (file, signedRequest, url) => {
    const options = {
      headers: {
        'Content-Type': file.type,
      }
    }
    axios
      .put(signedRequest, file, options)
      .then(response => {
        setIsUploading(false)
        if(user_id)updateProfileImg(user_id,url)
        else setFormValues({...formValues, img:url})
      })
      .catch(err => {
        setIsUploading(false)
        if (err.response.status === 403) {
          console.log(
            `Your request for a signed URL failed with a status 403. Double check the CORS configuration and bucket policy in the README. You also will want to double check your AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY in your .env and ensure that they are the same as the ones that you created in the IAM dashboard. You may need to generate new keys\n${
              err.stack
            }`
          )
        } else console.log(`err: ${err.status}\n ${err.stack}`);
      })
  }
  return (
    <Dropzone onDropAccepted={ getSignedRequest} accept="image/*" multiple={false} className="Upload">
      {isUploading? <GridLoader size='8px' color='#298aad'/> : <p>click here</p>}
    </Dropzone>
  )
}
