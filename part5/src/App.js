import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/notification'
import Error from './components/error'
import { Togglable } from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import { notify } from './reducers/notifications'
import { showError } from './reducers/errors'
import { connect } from 'react-redux'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      name: null,
      user: null,
      username: '',
      password: '',
      title: '',
      author: '',
      url: '',
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
      this.props.notify('Succesfull login', 3)


    } catch(exception) {
      this.setState({
        username: '',
        password: ''
      })
      this.props.showError('Invalid username or password', 3)
      console.log(exception)
    }
  }

  logout = () => {
    this.setState({ user: null })
    window.localStorage.removeItem('blogsUser')
    this.props.notify('Logged out', 3)
  }

  addBlog = async (event) => {
    event.preventDefault()
    this.blogForm.toggleVisibility()
    const { title, author, url } = this.state
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
      this.props.notify(`a new blog '${newBlog.title}' added.`, 3)
    } catch (exception) {
      this.props.setError('Error. See console for details :)', 3)
      console.error(exception)
    }
  }

  addLike = (blog) => {
    return(
      async () => {
        const { user, likes, author, title, url } = blog
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
        this.setState({ blogs })
        this.props.notify('Liked!', 3)
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
          this.setState({ blogs })
          this.props.notify(`blog '${blog.title}' removed.`, 3)
        } catch (exception) {
          console.error(exception)
          this.props.showError('Could not remove blogpost', 3)
        }
      }
    )
  }

  render() {

    if (this.state.user === null) {
      return (
        <div>
          <Notification />
          <Error />
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
        <Notification />
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
    )
  }
}

const blogSort = (a, b) => b.likes - a.likes

export default connect(
  null,
  { notify, showError }
)(App)
