import React from 'react'
import { connect } from 'react-redux'
import { deleteBlog, voteBlog, commentBlog } from './../reducers/blogs'
import { notify } from './../reducers/notifications'
import { showError } from './../reducers/errors'
import { Header, Label } from 'semantic-ui-react'
import LoaderGif from './LoaderGif'
import { Redirect } from 'react-router-dom'

const Url = ({ url }) => <a href={url}>{url}</a>

const Comment = ({ content }) => <div>{content}</div>

class Blog extends React.Component {

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

  addComment = async (event) => {
    event.preventDefault()
    const content = event.target.content.value
    event.target.content.value = ''
    const { commentBlog, notify, showError, blog } = this.props
    const id = blog.id
    try {
      await commentBlog(id, content)
      notify('Comment added!', 3)
    } catch (exception) {
      console.error(exception)
      showError('Error!')
    }
  }

  render() {
    const { blog } = this.props
    if (blog === undefined) return(<LoaderGif />)
    const comments = blog.comments.map(c => <Comment key={c} content={c} />)
    return(
      <div>
        <Header as='h3'>{blog.title} by {blog.author}</Header>
        <div>Comments:</div>
        {comments}
        <form onSubmit={this.addComment}>
          <div>
          comment:
            <input
              name="content"
            />
          </div>
          <button type="submit">Save</button>
        </form>
        <div><Url url={blog.url} /></div>
        {this.props.user && (!blog.user || blog.user._id === this.props.user.id) &&
          <div><button onClick={this.delete()}>delete</button></div>
        }
        <Label basic image>
          <img src='https://react.semantic-ui.com/images/avatar/small/joe.jpg' />
          {blog.user.name}
        </Label>
        <Label basic as='a' onClick={this.like()} content={blog.likes} icon='like' />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(
  mapStateToProps,
  {
    deleteBlog,
    voteBlog,
    notify,
    showError,
    commentBlog
  }
)(Blog)