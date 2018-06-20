import React,{ Component } from 'react'
import './styles/videoNodeStyles.scss'

const VideoNode = (props) => {
  const { node, isSelected } = props
  const src = node.data.get('src')
  return (
    <div className={`video-container ${isSelected ? 'selected' : ''}`}>
      <video 
        {...props.attributes}
        controls
        src={src}
        width='620'
      >
        Sorry your browser does not support embedded videos 😒
      </video>
    </div>
  )
}
export default VideoNode