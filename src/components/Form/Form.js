import React from 'react'
import { connect } from 'react-redux'
import states from './States.js'
import defaultImg from '../../assets/default.png'
import './Form.css'

function Form() {
  return (
    <div className='Form'>
      <div className='form-container'>
        <div>
          <h1 className='form-header'>Post</h1>
          <img src={defaultImg} alt='post img' className='form-img' />
        </div>
        <form onSubmit={e => e.preventDefault()}>
          <div className='form-input-container'>
            <input type='text' placeholder='title' />
            <input type='number' placeholder='price' />
            <textarea placeholder='item description'></textarea>
            <input type='text' placeholder='img path' />
            <div className='form-location-container'>
              <input type='text' placeholder='city' />
              <select>
                <option value=''>state</option>
                {states}
              </select>
            </div>
            <div className='form-button-container'>
              <button>cancel</button>
              <button>post</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

// const mapStateToProps = state => ({})

// const mapDispatchToProps = {}

export default connect(null, {})(Form)
