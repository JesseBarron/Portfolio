import React, { Component } from 'react'
import './styles/imageNodeStyle.scss'

const ImageNode = (props) => {
  const { node, isSelected} = props
  const src = node.data.get('src')
  return (
    <img {...props.attributes} src={src} className={`blog-image ${ isSelected ? 'selected' : '' }`} />
  )
}
export default ImageNode