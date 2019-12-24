import React, { useState } from 'react'


const Blog = ({ blog, likeBlog, deleteBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [fullView, setFullview] = useState(false)
  let blogreturn = null

  fullView === true ? 
    blogreturn = <div style={blogStyle}><ul>
      <li onClick={() => setFullview(false)}>{blog.title}</li> 
      <li>{blog.author}</li> 
      <li>Likes: {blog.likes}<button onClick={likeBlog}>Like</button></li> 
      <li>{blog.url}</li>
      <li><button onClick={deleteBlog}>Remove</button></li>
      </ul></div> :
    blogreturn = <div style={blogStyle}><ul>
      <li onClick={() => setFullview(true)}>{blog.title}</li> 
      <li>{blog.author}</li>
      
      </ul></div>

  return blogreturn
}

export default Blog