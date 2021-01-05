import React from 'react'
import {fireEvent, render, waitFor} from '@testing-library/react'
import {Redirect as MockRedirect} from 'react-router'
import {savePost as mockSavePost} from '../api'
import {Editor} from '../post-editor-01-markup3'

jest.mock('react-router', () => {
  return {
    Redirect: jest.fn(() => null),
  }
})

jest.mock('../api')

afterEach(() => {
  jest.clearAllMocks()
})

// see page 121
it('renders a form with title, content, tags and a submit button', async () => {
  mockSavePost.mockResolvedValueOnce()
  const fakeUser = {id: 'user-1'}

  const {getByLabelText, getByText} = render(<Editor user={fakeUser} />)

  const fakePost = {
    title: 'test title',
    content: 'test content',
    tags: ['tag1', 'tag2'],
  }

  getByLabelText(/title/i).value = fakePost.title
  getByLabelText(/content/i).value = fakePost.content

  getByLabelText(/tags/i).value = fakePost.tags.join(', ')
  const submitButton = getByText(/submit/i)

  fireEvent.click(submitButton)

  expect(submitButton).toBeDisabled()

  expect(mockSavePost).toHaveBeenCalledWith({
    ...fakePost,
    authorId: fakeUser.id,
  })
  expect(mockSavePost).toHaveBeenCalledTimes(1)

  await waitFor(() => expect(MockRedirect).toHaveBeenCalledWith({to: '/'}, {}))
})
