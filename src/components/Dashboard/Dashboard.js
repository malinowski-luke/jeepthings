import React, { Component } from 'react'
import Nav from '../Nav/Nav'
import { connect } from 'react-redux'
import { checkUser, logout } from '../../redux/userReducer'

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
    return (
      <div>
        <Nav user={this.props.user} logout={this.props.logout} />
        Dashboard.js
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { user } = state
  return { user }
}

const mapDispatchToProps = {
  checkUser,
  logout
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
