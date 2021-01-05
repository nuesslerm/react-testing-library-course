import React from 'react'
// import ReactDOM from 'react-dom'
// import {getQueriesForElement} from '@testing-library/dom'
import {render, cleanup} from '@testing-library/react'
// import 'react-testing-library/cleanup-aftereach'
import {FavoriteNumber} from '../favorite-number'

// function render(ui) {
//   const container = document.createElement('div')
//   ReactDOM.render(ui, container)
//   const queries = getQueriesForElement(container)
//   return {
//     container,
//     ...queries,
//   }
// }

// afterEach(() => {
//   cleanup()
//   console.log(document.body.outerHTML)
// })

afterEach(cleanup)

it("should render a number input with a label 'Favorite Number'", () => {
  const {container, getByLabelText, unmount} = render(<FavoriteNumber />)
  // console.log(document.body.outerHTML)
  const input2 = getByLabelText(/Favorite Number/i)
  expect(input2).toHaveAttribute('type', 'number')
  // expect(input2).toHaveTextContent(/Favorite Number/i)
  expect(container.querySelector('label')).toHaveTextContent(/Favorite Number/i)
  // unmount()
  // cleanup()
  // console.log(document.body.outerHTML)
})
