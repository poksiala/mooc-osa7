import React from 'react'
import {HideableDiv} from './Togglable'

const Url = ({url}) => <a href={url}>{url}</a>

class Blog extends React.Component { 
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }
  toggleVisibility = () => {
    this.setState({visible: !this.state.visible})
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
          <div>{blog.likes} <button onClick={this.props.handleLike(blog)}>like</button></div>
          {blog.user && <div>added by {blog.user.name}</div>}
          {this.props.user && (!blog.user || blog.user._id === this.props.user.id) &&
            <div><button onClick={this.props.handleDelete(blog)}>delete</button></div>
          }
        </HideableDiv>    
      </div>
    )
  }  
}

export default Blog