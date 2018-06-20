import React,{ Component } from 'react'
import './styles/youtubeNodeStyle.scss'

const YoutubeNode = (props) => {
  const { node, isSelected } = props
  const src = node.data.get('src')
  return(
    <div className={`yt-container ${isSelected ? 'selected' : ''}`} {...props.attributes}>
    <iframe
      frameBorder='0'
      width='720'
      height='405'
      src={src}
      className={`blog-video`}
      ></iframe>
    </div>
  )
}
export default YoutubeNode