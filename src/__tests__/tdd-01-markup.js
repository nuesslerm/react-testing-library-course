import React from 'react'
import {fireEvent, render, screen} from '@testing-library/react'
// import userEvent from '@testing-library/user-event'
import {savePost as mockSavePost} from '../api'
import {Editor} from '../post-editor-01-markup'

// automatically creates jest mock functions for each of the exposed functions
// in the api module / file
jest.mock('../api')

afterEach(() => {
  // need to call jest.clearAllMocks() in between each test to keep them isolated
  jest.clearAllMocks()
})

it('renders a form with title, content, tags and a submit button', () => {
  mockSavePost.mockResolvedValueOnce()
  const fakeUser = {id: 'user-1'}

  // const {getByLabelText, getByText} = render(<Editor />)
  render(<Editor user={fakeUser} />)

  const fakePost = {
    title: 'test title',
    content: 'test content',
    tags: ['tag1', 'tag2'],
  }

  screen.getByLabelText(/title/i).value = fakePost.title
  screen.getByLabelText(/content/i).value = fakePost.content
  // turn comma-separated string into array for saving labels
  screen.getByLabelText(/tags/i).value = fakePost.tags.join(', ')
  const submitButton = screen.getByText(/submit/i)

  fireEvent.click(submitButton)
  // userEvent.click(submitButton)

  expect(submitButton).toBeDisabled()

  expect(mockSavePost).toHaveBeenCalledWith({
    ...fakePost,
    authorId: fakeUser.id,
  })
  expect(mockSavePost).toHaveBeenCalledTimes(1)
})
