import React from 'react'
import { shallow } from 'enzyme'
import Blog from './Blog'

const blogData = {
  title: 'title',
  author: 'author',
  likes: 0,
  user: {},
}

describe('<Blog />', () => {
  it('renders title and author', () => {

    const handleLike = jest.fn()
    const handleDelete = jest.fn()

    const blogComponent = shallow(
      <Blog 
        blog={blogData}   
        handleLike={handleLike}
        handleDelete={handleDelete}
      />
    )
    const container = blogComponent.find('.title-author')
    expect(container.text())
      .toContain(`${blogData.title} by ${blogData.author}`)
  })

  it('Other fields are shown only after click', () => {
    const handleLike = jest.fn()
    const handleDelete = jest.fn()

    const blogComponent = shallow(
      <Blog 
        blog={blogData}   
        handleLike={handleLike}
        handleDelete={handleDelete}
      />
    )
    const titleAuthor = blogComponent.find('.title-author')
    let hideableDiv = blogComponent.find('.hideable')
    expect(hideableDiv.getElement().props.visible).toEqual(false)
    titleAuthor.simulate('click')
    hideableDiv = blogComponent.find('.hideable')
    expect(hideableDiv.getElement().props.visible).toEqual(true)
  })
})