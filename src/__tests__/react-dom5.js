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
  const {getByLabelText, getByTestId, queryByTestId, rerender, debug} = render(
    <FavoriteNumber />,
  )
  const input = getByLabelText(/favorite number/i)
  user.type(input, '10')
  // debug()
  expect(getByTestId('error-message')).toHaveTextContent(
    /the number is invalid/i,
  )
  // rerender will rerender the component with the new props
  // however input still points to the old version of the component, so using
  // user.type(input, '10') will again throw an error even if use after
  // rerender(<FavoriteNumber max={10} />)

  // const input2 = rerender(<FavoriteNumber max={10} />) -> NOT POSSIBLE,
  // rerender returns undefined!
  // rerender can be used if you want to check that a component fails
  // based on one prop state, but passes based on another prop state,
  // given the same user input
  rerender(<FavoriteNumber max={10} />)

  // user.type(input, '10')
  // debug()
  expect(queryByTestId('error-message')).not.toBeInTheDocument()
})
