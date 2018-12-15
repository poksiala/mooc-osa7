import React from 'react'
import { Header } from 'semantic-ui-react'
import { PresentationalBlogs } from './Blogs'
import LoaderGif from './LoaderGif'

const User = ({ user }) => {
  if (user === undefined) return(<LoaderGif />)
  const { name, username } = user
  const blogs = user.blogs.map(blog => {
    return {
      ...blog,
      id: blog._id
    }
  })
  return (
    <div>
      <Header as='h2'>{name} aka. {username}</Header>
      <Header as='h3'>Added blogs:</Header>
      <PresentationalBlogs blogs={blogs} />
    </div>
  )
}

export default User