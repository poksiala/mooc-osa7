import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'semantic-ui-react'

export const PresentationalBlogs = ({ blogs }) => {
  const blogList = blogs.map(blog =>
    <Table.Row key={blog.id}>
      <Table.Cell>
        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
      </Table.Cell>
      <Table.Cell>
        {blog.likes} likes
      </Table.Cell>
    </Table.Row>
  )

  return (
    <Table striped celled>
      <Table.Body>
        {blogList}
      </Table.Body>
    </Table>
  )
}

const blogSort = (a, b) => b.likes - a.likes

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs.sort(blogSort)
  }
}

export default connect(
  mapStateToProps
)(PresentationalBlogs)