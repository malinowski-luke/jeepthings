import React, { Component } from 'react'
import { connect } from 'react-redux'
import { checkUser, logout } from '../../redux/userReducer'
import './Dashboard.css'

class Dashboard extends Component {
  componentDidMount() {
    this.props.checkUser()
    const { user_name } = this.props.user
    if (!user_name) this.props.history.push('/')
  }

  componentDidUpdate() {
    const { user_name } = this.props.user
    if (!user_name) this.props.history.push('/')
  }

  render() {
    return <div className='Dashboard'>Dashboard.js</div>
  }
}

const mapStateToProps = state => {
  const { user } = state
  return { user }
}

export default connect(mapStateToProps, { checkUser })(Dashboard)
