import React from 'react'
import { connect } from 'react-redux'
import { deleteBlog, voteBlog } from './../reducers/blogs'
import { notify } from './../reducers/notifications'
import { showError } from './../reducers/errors'
import { Header, Label } from 'semantic-ui-react'
import LoaderGif from './LoaderGif'

const Url = ({ url }) => <a href={url}>{url}</a>

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

  render() {
    const { blog } = this.props

    if (blog === undefined) return(<LoaderGif />)
    return(
      <div>
        <Header as='h3'>{blog.title}</Header>
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

export default connect(
  null,
  {
    deleteBlog,
    voteBlog,
    notify,
    showError
  }
)(Blog)