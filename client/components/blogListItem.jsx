import React,{ Component } from 'react'
import './styles/bioListItemStyles.scss'

const BlogListItem = ({ post }) => {
  let { name } = post.author
  name = name[0].toUpperCase() + name.substr(1)
  return(
    <div key={post._id} className='blog-list-item-container'>
      <img src={'assets/Dstag.jpg'} style={{height:'100px', objectFit: 'contain'}}/>
      {/* <img src={post.thumbnail || 'assets/Dstag.jpg'} style={{height:'100px'}}/> */}
      <div className='blog-list-description'>
        <h2>{post.title}</h2>
        <p>{post.preview}</p>
        <label style={{color: 'yellowgreen'}}>Written By: {name}</label>
      </div>
    </div>
  )
}

export default BlogListItem