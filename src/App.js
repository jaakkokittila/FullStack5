import React, {useState, useEffect} from 'react';
import loginService from './services/login' 
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import Blog from './components/Blog'
import './app.css'
import AddBlog from './components/AddBlog';


const App = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [loginVisible, setLoginVisible] = useState(false)
  const [blogFormVisible, setBlogFormVisible] = useState(false)

  useEffect(() => {
    blogService.getAll()
      .then(blogs => blogs.sort(function(a, b){
        return a.likes - b.likes
      }))
      .then(blogs => setBlogs(blogs))
    
  }, [])

  useEffect(() => {
    const loggeduser = window.localStorage.getItem('signin')
    if (loggeduser) {
      const user = JSON.parse(loggeduser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])
  
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'signin', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage(<p id="error">wrong credentials</p>)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }



  const addBlog = () =>{
    const blog = {
      title : title,
      author : author,
      url : url,
      likes : 0
    }

    try{
      blogService.add(blog)
      setMessage(<p id="success">Added {blog.title} by {blog.author}</p>)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }catch(error){
      setMessage(<p id="error">Something went wrong</p>)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const likeBlog = blog => {
    const likedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id
    }
    

    const response = blogService.like(likedBlog, blog.id)
    console.log(response)
  }

  const remove = blog => {
    const result = window.confirm("Do you want to delete?")
    if(result){
      const response = blogService.remove(blog.id)
      console.log(response)
    }
   
  }

  const loggedInView = () => {
    const hideWhenVisible = { display: blogFormVisible ? 'none' : '' }
    const showWhenVisible = { display: blogFormVisible ? '' : 'none' }
    
    
    return(
      <div>
        <p>Logged in as {user.username}</p> <button onClick={() =>{

        window.localStorage.removeItem('signin')
        setUser(null)
        }
         } >Log out</button>
         <div style={hideWhenVisible}>

          <button onClick={() => setBlogFormVisible(true)}>Add blog</button>
        </div>
          <div style={showWhenVisible}>
        
            <AddBlog
              title={title}
              author={author}
              url={url}
              setTitle={({ target }) => setTitle(target.value)}
              setAuthor={({ target }) => setAuthor(target.value)}
              setUrl={({ target }) => setUrl(target.value)}
              addBlog={addBlog}
              />
            
            <button onClick={() => setBlogFormVisible(false)} >Hide form</button>
          </div>
        
        <ul>
          {blogs.map(blog => <Blog blog={blog}
          key={blog.id} 
          likeBlog={() => likeBlog(blog)}
          deleteBlog={() => remove(blog)} />)}
        </ul>
      </div>
    )
}

  return (
    <div className="App">

      {message}
      
      {user === null ? 
      loginForm() :
      loggedInView()}
      
    </div>
  );
}

export default App;
