import React from 'react'
import { HideableDiv } from './Togglable'
import { connect } from 'react-redux'
import { deleteBlog, voteBlog } from './../reducers/blogs'
import { notify } from './../reducers/notifications'
import { showError } from './../reducers/errors'

const Url = ({ url }) => <a href={url}>{url}</a>

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }
  toggleVisibility = () => {
    this.setState({ visible: !this.state.visible })
  }

  like = () => {
    return(
      async () => {
        try {
          await this.props.voteBlog(this.props.blog)
          this.props.notify('Liked!', 3)
        } catch (exception) {
          console.error(exception)
          this.props.showError('Somethin went wrong')
        }
      }
    )
  }

  delete = () => async () => {
    const { blog, deleteBlog, notify, showError } = this.props
    try {
      await deleteBlog(blog.id)
      notify(`blog '${blog.title}' removed.`, 3)
    } catch (exception) {
      console.error(exception)
      showError('Could not remove blogpost', 3)
    }
  }

  render() {
    const { blog } = this.props
    return(
      <div className="blog-container">
        <div className="title-author" onClick={this.toggleVisibility}>
          {blog.title} by {blog.author}
        </div>
        <HideableDiv
          className="hideable"
          visible={this.state.visible}
        >
          <div><Url url={blog.url} /></div>
          <div>{blog.likes} <button onClick={this.like()}>like</button></div>
          {blog.user && <div>added by {blog.user.name}</div>}
          {this.props.user && (!blog.user || blog.user._id === this.props.user.id) &&
            <div><button onClick={this.delete()}>delete</button></div>
          }
        </HideableDiv>
      </div>
    )
  }
}

export default connect(
  null,
  {
    deleteBlog,
    voteBlog,
    notify,
    showError
  }
)(Blog)