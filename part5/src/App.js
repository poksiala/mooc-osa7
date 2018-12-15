import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/notification'
import Error from './components/error'
import {Togglable} from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      name: null,
      user: null,
      username: "",
      password: "",
      title: "",
      author: "",
      url: "",
      notification: null,
      error: null,
    }
  }

  componentDidMount() {

    const userJson = window.localStorage.getItem('blogsUser')
    if (userJson) {
      const user = JSON.parse(userJson)
      this.setState({
        user
      })
      blogService.setToken(user.token)
    }

    blogService.getAll().then(blogs => {
      blogs.sort(blogSort)
      this.setState({ blogs })
    })
  }

  handleFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  login = async (event) => {
    event.preventDefault()
    try{
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

      window.localStorage.setItem('blogsUser', JSON.stringify(user))

      blogService.setToken(user.token)
      this.setState({ 
        username: '', 
        password: '', 
        user
      })
      this.setNotification('Succesfull login')

      
    } catch(exception) {
      this.setState({
        username: '',
        password: ''
      })
      this.setError('Invalid username or password')
      console.log(exception)
    }
  }

  logout = () => {
    this.setState({user: null})
    window.localStorage.removeItem('blogsUser')
    this.setNotification('Logged out')
  }

  addBlog = async (event) => {
    event.preventDefault()
    this.blogForm.toggleVisibility()
    const {title, author, url} = this.state
    try {
      const newBlog = await blogService
        .create({
          title,
          author,
          url
        })

      this.setState({
        blogs: this.state.blogs.concat(newBlog),
        title: '',
        author: '',
        url: ''
      })
      this.setNotification(`a new blog '${newBlog.title}' added.`)      
    } catch (exception) {
      this.setError(`Error. See console for details :)`)
      console.error(exception)
    }
  }

  setNotification = (notification) => {
    this.setState({notification})
    setTimeout(() => this.setState({notification: null}), 2000)
  }

  setError = (error) => {
    this.setState({error})
    setTimeout(() => this.setState({error: null}), 2000)
  }

  addLike = (blog) => {
    return(
      async () => {
        const {user, likes, author, title, url} = blog
        const blogData = {
          user: user._id,
          likes: likes + 1,
          author,
          title,
          url,
        }
        const updatedBlog = await blogService.update(blog.id, blogData)
        const blogs = this.state.blogs.map((b) => {
          return (b.id === updatedBlog.id) ? updatedBlog : b
        }).sort(blogSort)
        this.setState({blogs})
        this.setNotification('Liked!')
      }
    )
  }

  deleteBlog = (blog) => {
    return (
      async () => {
        const id = blog.id
        try {
          await blogService.remove(id)
          const blogs = this.state.blogs.filter(b => b.id !== id)
          this.setState({blogs})
          this.setNotification(`blog '${blog.title}' removed.`)
        } catch (exception) {
          console.error(exception)
          this.setError('Could not remove blogpost')
        }
      }
    )
  }

  render() {

    if (this.state.user === null) {
      return (
        <div>
          <Notification message={this.state.notification} />
          <Error message={this.state.error} />
          <h2>Log in</h2>
            <LoginForm
              username={this.state.username}
              password={this.state.password}
              handleChange={this.handleFieldChange}
              handleSubmit={this.login}
            />
        </div>
      )
    }

    return (
      <div>
        <h2>blogs</h2>
        <Notification message={this.state.notification} />
        <Error message={this.state.error} />
        <p>
          {this.state.user.name} logged in. <button onClick={this.logout}>logout</button>
        </p>
        {this.state.blogs.map(blog => 
          <Blog 
            key={blog.id} 
            blog={blog}
            handleLike={this.addLike}
            handleDelete={this.deleteBlog}
            user={this.state.user}
          />
        )}
        <div>
          <Togglable buttonLabel='add new' ref={component => this.blogForm = component}>
            <BlogForm
              handleSubmit={this.addBlog}
              handleChange={this.handleFieldChange}
              url={this.state.url}
              author={this.state.author}
              title={this.state.title}
            />
          </Togglable>
        </div>
      </div>
    );
  }
}

const blogSort = (a, b) => b.likes - a.likes

export default App;
