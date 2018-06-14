import React, { Component } from 'react'

const ImageNode = (props) => {
  return (
    <div {...props.attributes}>
      <img {...props.attributes} src={'/assets/Dstag.jpg'} alt="stag" height='200px' width='200px'/>
    </div>
  )
}
export default ImageNode