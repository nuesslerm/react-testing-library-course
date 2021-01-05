import React from 'react'
import {render, fireEvent, waitFor} from '@testing-library/react'
import {HiddenMessage} from '../hidden-message'

// because we're not asserting the functional component CSSTransition in the test
// we can ommit the import of it, see tdd-01-markup2.js
// mock entire imported library / package
jest.mock('react-transition-group', () => {
  return {
    CSSTransition: (props) => (props.in ? props.children : null),
  }
})

it('should show hidden message when toggle is clicked', () => {
  const myMessage = 'hello world'
  // getByText for buttons
  const {getByText, queryByText} = render(
    <HiddenMessage>{myMessage}</HiddenMessage>,
  )
  const toggleButton = getByText(/toggle/i)
  expect(queryByText(myMessage)).not.toBeInTheDocument()

  fireEvent.click(toggleButton)
  expect(getByText(myMessage)).toBeInTheDocument()
  fireEvent.click(toggleButton)
  // await waitFor(() => expect(queryByText(myMessage)).not.toBeInTheDocument(), {
  //   timeout: 100000,
  // })
  expect(queryByText(myMessage)).not.toBeInTheDocument()
})
