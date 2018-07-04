import React,{ Component } from 'react'


const BlogListItem = ({ post }) => {
  return(
    <div key={post._id} style={{ background: 'grey', display: 'flex', flexDirection: 'row', marginBottom: '8px', padding: '5px' }}>
      <img src={post.thumbnail || 'assets/Dstag.jpg'} style={{height:'100px'}}/>
      <h3> {post.title} </h3>
    </div>
  )
}

export default BlogListItem