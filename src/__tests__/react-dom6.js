/*
 * Test React Component Event Handlers with
 * fireEvent from react-testing-library
 */

import React from 'react'
import {render} from '@testing-library/react'
import {FavoriteNumber} from '../favorite-number'
import user from '@testing-library/user-event'

it("should render a number input with a label 'Favorite Number'", () => {
  const {getByLabelText} = render(<FavoriteNumber />)
  const input = getByLabelText(/Favorite Number/i)
  expect(input).toHaveAttribute('type', 'number')
})

it('should show an error message when entering an invalid value', () => {
  const {getByLabelText, getByTestId, queryByTestId, rerender} = render(
    <FavoriteNumber />,
  )
  // use get prefixes for nice error messages
  const input = getByLabelText(/favorite number/i)
  user.type(input, '10')
  expect(getByTestId('error-message')).toHaveTextContent(
    /the number is invalid/i,
  )
  rerender(<FavoriteNumber max={10} />)

  // use query prefixes to assert that an element doesn't exist in the DOM
  // expect(queryByTestId('errormessage')).toBeNull()
  expect(queryByTestId('error-message')).not.toBeInTheDocument()
})
