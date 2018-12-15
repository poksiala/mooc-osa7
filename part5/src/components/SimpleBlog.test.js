import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

const blogData = {
  title: 'title',
  author: 'author',
  likes: 0,
}

describe('<SimpleBlog />', () => {
  it('renders title, author and likes', () => {
    const blogComponent = shallow(<SimpleBlog blog={blogData} />)
    const titleAuthorDiv = blogComponent.find('.title-author')
    const likeDiv = blogComponent.find('.likes')
    expect(titleAuthorDiv.text()).toBe(`${blogData.title} ${blogData.author}`)
    expect(likeDiv.text()).toContain(`blog has ${blogData.likes} likes`)
  })

  it('Like onClick is called on every click', () => {
    const mockHandler = jest.fn()
    const blogComponent = shallow(
      <SimpleBlog
         blog={blogData}
         onClick={mockHandler}
      />
    )

    const button = blogComponent.find('button')
    button.simulate('click')
    expect(mockHandler.mock.calls.length).toBe(1)
    button.simulate('click')
    expect(mockHandler.mock.calls.length).toBe(2)  
    
  })
})