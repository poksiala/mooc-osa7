import React from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/notification'
import Error from './components/error'
import { Togglable } from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import { notify } from './reducers/notifications'
import { showError } from './reducers/errors'
import {
  voteBlog, initializeBlogs,
  createBlog, deleteBlog
} from './reducers/blogs'
import { connect } from 'react-redux'
import Blogs from './components/Blogs'
import Blog from './components/Blog'
import { initializeUsers } from './reducers/users'
import {
  Container, Grid
} from 'semantic-ui-react'

import {
  BrowserRouter as Router,
  Route, Redirect, Link
} from 'react-router-dom'
import Users from './components/Users'
import User from './components/User'

const Navigation = () => {
  return (
    <Grid columns={8}>
      <Grid.Row>
        <Grid.Column key={1}>
          Navigation:
        </Grid.Column>
        <Grid.Column key={2}>
          <Link to='/users'>Users</Link>
        </Grid.Column>
        <Grid.Column key={3}>
          <Link to='/blogs'>Blogs</Link>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
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

    this.props.initializeBlogs()
    this.props.initializeUsers()
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
      await this.props.createBlog({
        title,
        author,
        url
      })
      this.setState({
        title: '',
        author: '',
        url: ''
      })
      this.props.notify(`a new blog '${title}' added.`, 3)
    } catch (exception) {
      this.props.setError('Error. See console for details :)', 3)
      console.error(exception)
    }
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
      <Container>
        <Router>
          <div>
            <h2>blogs</h2>
            <Navigation />
            <Notification />
            <Error message={this.state.error} />
            <p>
              {this.state.user.name} logged in. <button onClick={this.logout}>logout</button>
            </p>
            <Route exact path='/' render={() => <Redirect to='/blogs' />} />
            <Route exact path='/blogs' render={() => <Blogs />} />
            <Route exact path='/blogs/:id' render={({ match }) =>
              <Blog blog={this.props.blogs.find(b => b.id === match.params.id)} />
            } />
            <Route exact path='/users' render={() => <Users />} />
            <Route exact path='/users/:id' render={({ match }) =>
              <User user={this.props.users.find(u => u.id === match.params.id)} />
            }/>
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
        </Router>
      </Container>
    )
  }
}


const mapStatetoProps = (state) => {
  return {
    blogs: state.blogs,
    users: state.users
  }
}

export default connect(
  mapStatetoProps,
  {
    notify,
    showError,
    initializeBlogs,
    voteBlog,
    createBlog,
    deleteBlog,
    initializeUsers
  }
)(App)
