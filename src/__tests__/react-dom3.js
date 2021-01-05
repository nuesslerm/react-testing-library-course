import React from 'react'
import {render} from '@testing-library/react'
import {FavoriteNumber} from '../favorite-number'

it("should render a number input with a label 'Favorite Number'", () => {
  const {getByLabelText, debug} = render(<FavoriteNumber />)
  const input = getByLabelText(/Favorite Number/i)
  expect(input).toHaveAttribute('type', 'number')
  // calling debug without arg will default to the container element
  // calling debug with arg print the dom node that is passed to it
  // debug()
  // debug(input)
})
