import React from 'react'
import { connect } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { clearReducer } from '../../redux/userReducer'

function Error(props) {
  if (props.err) {
    toast.error(props.errMsg, {
      position: toast.POSITION.BOTTOM_RIGHT
    })
    props.clearReducer()
  } else if (props.validation) {
    toast.error(props.validation, {
      position: toast.POSITION.BOTTOM_RIGH
    })
    delete props.validation
  }
  return (
    <div>
      <ToastContainer autoClose={props.close} />
    </div>
  )
}

const mapStateToProps = reduxState => {
  const { err, errMsg } = reduxState
  return { err, errMsg }
}

export default connect(mapStateToProps, { clearReducer })(Error)
