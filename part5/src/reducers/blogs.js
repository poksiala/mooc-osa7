import blogService from './../services/blogs'

const blogReducer = (state = [], action) => {
  switch (action.type) {
  case 'NEW_BLOG':
    return [...state, action.data]
  case 'INIT_BLOGS':
    return action.data
  case 'DELETE_BLOG':
    return state.filter(b => b.id !== action.id)
  case 'UPDATE_BLOG':
    return state.map(b => b.id === action.data.id ? action.data: b)
  default:
    return state
  }
}


export const createBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog
    })
  }
}

export const initializeBlogs = () => {
  return async (dispatch) => {
    const data = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data
    })
  }
}

export const voteBlog = (blog) => {
  return async (dispatch) => {
    const { user, likes, author, title, url } = blog
    const blogData = {
      user: user._id,
      likes: likes + 1,
      author,
      title,
      url,
    }
    const updatedBlog = await blogService.update(blog.id, blogData)
    dispatch({
      type: 'UPDATE_BLOG',
      data: updatedBlog
    })
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id)
    dispatch({
      type: 'DELETE_BLOG',
      id
    })
  }
}

export default blogReducer