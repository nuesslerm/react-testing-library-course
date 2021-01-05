/*
 * Test React Component Event Handlers with
 * fireEvent from react-testing-library
 */

import React from 'react'
import {render, fireEvent} from '@testing-library/react'
import {FavoriteNumber} from '../favorite-number'
import user from '@testing-library/user-event'

it("should render a number input with a label 'Favorite Number'", () => {
  const {getByLabelText} = render(<FavoriteNumber />)
  const input = getByLabelText(/Favorite Number/i)
  expect(input).toHaveAttribute('type', 'number')
})

it('should show an error message when entering an invalid value', () => {
  const {getByLabelText, getByRole, getByText, getByTestId, container} = render(
    <FavoriteNumber />,
  )
  const input = getByLabelText(/favorite number/i)
  // input is the target
  // fireEvent.change(input, {target: {value: '11'}})
  // user class uses fireEvent under the hood to simulate user input more
  // realistically. besides the change event it will fire, some other
  // browser events that would typically be the case in a normal browser environment
  user.type(input, '10')
  // expect(getByRole('alert')).toHaveTextContent(/the number is invalid/i)
  // expect(container).toHaveTextContent(/the number is invalid/i)
  // expect(getByText(/the number is invalid/i))
  // expect(getByText(/the number is invalid/i)).toBeTruthy()
  expect(getByText(/the number is invalid/i)).toBeInTheDocument()
  expect(getByTestId('error-message')).toBeInTheDocument()
  expect(getByTestId('error-message')).toHaveTextContent(
    /the number is invalid/i,
  )
})
