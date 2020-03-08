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
          <div>
            <input type='text' placeholder='title' />
            <input type='number' placeholder='price' />
          </div>
          <textarea></textarea>
          <input type='text' placeholder='img path' />
          <div>
            <input type='text' placeholder='city' />
            <select>
              <option value=''>state</option>
              {states}
            </select>
          </div>
          <div>
            <button>cancel</button>
            <button>clear</button>
            <button>post</button>
          </div>
        </form>
      </div>
    </div>
  )
}

// const mapStateToProps = state => ({})

// const mapDispatchToProps = {}

export default connect(null, {})(Form)
