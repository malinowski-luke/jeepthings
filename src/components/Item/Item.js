import React from 'react'
import { connect } from 'react-redux'
import './Item.css'

function Item(props) {
  const { user_id, post_id } = props.match.params
  console.log('hit')
  return (
    <div className='Item'>
      Item user:{user_id} post:{post_id}
    </div>
  )
}

// const mapStateToProps = state => ({})

// const mapDispatchToProps = {}

export default connect(null, {})(Item)
