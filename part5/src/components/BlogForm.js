import React from 'react'
import PropTypes from 'prop-types'

const BlogForm = props => {
  return(
    <div>
    <form onSubmit={props.handleSubmit}>
      <div>
        title:
        <input
          name="title"
          value={props.title}
          onChange={props.handleChange}
        />
        </div>
        <div>
          author:
        <input
          name="author"
          value={props.author}
          onChange={props.handleChange}
        />
        </div>
        <div>
          url:
        <input
          name="url"
          value={props.url}
          onChange={props.handleChange}
        />
        </div>
      <button type="submit">Save</button>
    </form>
    </div>
  )
}

BlogForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  author: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
}


export default BlogForm