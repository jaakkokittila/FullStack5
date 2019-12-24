import React from 'react'

const SimpleBlog = ({ blog, onClick }) => (
  <div>
    <div>
      <p class="title">{blog.title}</p> <p class="author">{blog.author}</p>
    </div>
    <div>
      blog has <p class="likes">{blog.likes}</p> likes
      <button onClick={onClick}>like</button>
    </div>
  </div>
)

export default SimpleBlog