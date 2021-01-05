import React from 'react'
import {fireEvent, render, waitFor} from '@testing-library/react'
import {Redirect as MockRedirect} from 'react-router'
import {savePost as mockSavePost} from '../api'
import {Editor} from '../post-editor-01-markup2'

// mocking package
jest.mock('react-router', () => {
  return {
    // this jest.fn() returns null, because we don't really care about what it's rendering
    // the return of the mocked Redirect is the component that is going to be rendered after redirect occured
    Redirect: jest.fn(() => null),
  }
})

// mocking single module
jest.mock('../api')

afterEach(() => {
  jest.clearAllMocks()
})

it('renders a form with title, content, tags and a submit button', async () => {
  mockSavePost.mockResolvedValueOnce()
  const fakeUser = {id: 'user-1'}

  const {getByLabelText, getByText, debug} = render(<Editor user={fakeUser} />)

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

  // debug()
  expect(submitButton).toBeDisabled()

  expect(mockSavePost).toHaveBeenCalledWith({
    ...fakePost,
    authorId: fakeUser.id,
  })
  expect(mockSavePost).toHaveBeenCalledTimes(1)

  // all function components are called with a second argument, which is the context,
  // this context can be left empty in our case, becasue we're just asserting whether
  // it was called with the correct "to" prop
  await waitFor(() => expect(MockRedirect).toHaveBeenCalledWith({to: '/'}, {}))
  // using toHaveBeenCalledTimes on functional react components is generally a bad idea,
  // because the user doesn't care if the component rendered once or 3 times,
  // as long as it rendered. so using toHaveBeenCalledTimes on a react component
  // would be optimising for the wrong thingk and make the tests potentially more flaky
  // expect(MockRedirect).toHaveBeenCalledTimes(1)
})
