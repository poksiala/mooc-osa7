import React from 'react'
import { mount } from 'enzyme'
import App from './App'
jest.mock('./services/blogs')
import Blog from './components/Blog'
import noteService from './services/blogs'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'


describe('<App />', () => {
  let app

  describe('when user is not logged', () => {
    beforeEach(() => {
      localStorage.clear()
      app = mount(<App />)
    })

    it('login form is rendered', () => {
      app.update()
      const loginFormExists = app.find(LoginForm).exists()
      expect(loginFormExists).toBe(true)
    })

    it('no blogs are renderde', () => {
      app.update()
      const blogExists = app.find(Blog).exists()
      expect(blogExists).toBe(false)
    })
  })

  describe('when user is logged', () => {
    beforeEach(() => {
      window.localStorage.setItem(
        'blogsUser',
        JSON.stringify({
          id: "5c0ee2d055b2fe1ac5037781",
          name: "taavi",
          username: "taavi",
          token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRhYXZpIiwiaWQiOiI1YzBlZTJkMDU1YjJmZTFhYzUwMzc3ODEiLCJpYXQiOjE1NDQ1NjEyMTB9.G5jAHqhNJTR6_F4fEKV8BWZJXqTtGJ9juQTlohc26SY"
        })  
      )
      app = mount(<App />)
    })

    it('login form is not rendered', () => {
      app.update()
      const loginFormExists = app.find(LoginForm).exists()
      expect(loginFormExists).toBe(false)
    })

    it('all blogs are rendered', () => {
      app.update()
      const blogs = app.find(Blog)
      expect(blogs.length).toEqual(3)
    })
  })
})