import React from 'react'

const AddBlog = ({
    addBlog,
    setTitle,
    setAuthor,
    setUrl,
    author,
    title,
    url
}) => {return(
    <div>
    <p><b>Create new</b></p>

        <form onSubmit={addBlog}>
          Title <input type="text" value={title} onChange={setTitle} />
          Author <input type="text" value={author} onChange={setAuthor} />
          URL <input type="text" value={url} onChange={setUrl} />

          <button type="submit">Add</button>
        </form>
        </div>
)
    
}

export default AddBlog