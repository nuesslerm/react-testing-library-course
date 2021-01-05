// import {toHaveAttribute, toHaveTextContent} from '@testing-library/jest-dom'
// import * as jestDOM from '@testing-library/jest-dom'
// import "@testing-library/jest-dom/extend-expect"
// -> put this in setup-files configuration for jest, similar to test/setup-env.js
import React from 'react'
import ReactDOM from 'react-dom'
// import {queries, screen} from '@testing-library/react'
import {queries, screen, getQueriesForElement} from '@testing-library/dom'
import {FavoriteNumber} from '../favorite-number'

// expect.extend({toHaveAttribute, toHaveTextContent})
// expect.extend(jestDOM)

it("should render a number input with a label 'Favorite Number'", () => {
  const div = document.createElement('div')
  ReactDOM.render(<FavoriteNumber />, div)
  // console.log(div.innerHTML)

  const {getByLabelText} = getQueriesForElement(div)
  // It would be really nice, if I could actually get the input by its label.
  // const input = queries.getByLabelText(div, 'Favorite Number')
  // const input = queries.getByLabelText(div, /Favorite Number/i)
  const input2 = getByLabelText(/Favorite Number/i)
  // expect(div.querySelector('input').type).toBe('number')
  // expect(div.querySelector('input')).toHaveAttribute('type', 'number')
  // expect(input).toHaveAttribute('type', 'number')
  expect(input2).toHaveAttribute('type', 'number')
  // expect(div.querySelector('label').textContent).toBe('Favorite Number')
  // expect(div.querySelector('label')).toHaveTextContent('Favorite Number')
  expect(div.querySelector('label')).toHaveTextContent(/Favorite Number/i)
})
