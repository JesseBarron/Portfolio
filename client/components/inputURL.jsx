import React, { Component } from 'react'

import './styles/inputURLStyle.scss'

const InputURL = ({ insert, type, closeModal, error }) => {
  return (
    <div className='inputURL'>
      <form className='URLForm' onSubmit={(e) => insert(e, type)}>
        <label>Enter your {type.toUpperCase()} URL</label>
        <input type='url' placeholder='Enter your URL' name='media-url' autoComplete="off"/>
        <span id='error-message'>{error}</span>
        <div className='URL-bttns'>
          <button type='submit'>Ok</button>
          <button type='button' onClick={closeModal}>Cancel</button>
        </div>
      </form>
    </div>
  )
}
export default InputURL

