import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import SimpleBlog from './SimpleBlog'



test('renders simpleblog', () => {
    const simpleblog = {
         title: 'Test title',
         author: 'Test author',
         likes: 10
    }

    const component = render(
        <SimpleBlog blog={simpleblog} />
    )

    const title = component.container.querySelector('.title')
    const author = component.container.querySelector('.author')
    const likes = component.container.querySelector('.likes')

    expect(title).toHaveTextContent('Test title')
    expect(author).toHaveTextContent('Test author')
    expect(likes).toHaveTextContent(10)
})

test('two clicks, two calls', () => {
    const simpleblog = {
        title: 'Test title',
        author: 'Test author',
        likes: 10
   }

   const mockHandler = jest.fn()

   const { getByText } = render(
    <SimpleBlog blog={simpleblog} onClick={mockHandler} />
  )

  const button = getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)
})

test('blog component view works', () => {
    const blog = {
        title: 'Test title',
        author: 'Test author',
        likes: 5,
        url: 'www'
    }

    const component1 = render(
        <Blog blog={blog }/>
    )

    expect(component1.container).toHaveTextContent('Test title')
    expect(component1.container).toHaveTextContent('Test author')
    expect(component1.container).not.toHaveTextContent(5)
    expect(component1.container).not.toHaveTextContent('www')

    const button = component1.getByText('Test title')
    fireEvent.click(button)

    expect(component1.container).toHaveTextContent('Test title')
    expect(component1.container).toHaveTextContent('Test author')
    expect(component1.container).toHaveTextContent(5)
    expect(component1.container).toHaveTextContent('www')


})