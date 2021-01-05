import React from 'react'
import {render, fireEvent} from '@testing-library/react'
import {reportError as mockReportError} from '../api'
import {ErrorBoundary} from '../error-boundary'

jest.mock('../api')

// child component used for testing the error state
function Bomb({shouldThrow}) {
  if (shouldThrow) {
    throw new Error('💣')
  } else {
    return null
  }
}

// we mock out the console to get rid of the undesirable console errors,
// which are expected for the ErrorBoundary test
// .mockImplementation(() => {}) overwrites the default behaviour with the callback
beforeAll(() => {
  // spyOn class.method or module.function
  jest.spyOn(console, 'error').mockImplementation(() => {})
})

afterAll(() => {
  // restore normal behaviour of console.error() to original implementation
  console.error.mockRestore()
})

// make sure to clear all mocks after tests so that mock results from one test
// aren't leaking into mock results from other test in the same file
// most relevant to number of times called .toHaveBeenCalledTimes(num)
// reset is important to assess the correct number of calls for spies and mocks
afterEach(() => {
  // clears/removes mock implementations, same as mockReset() (?)
  jest.clearAllMocks()
})

it('sohuld call reportError and render that there was a problem', () => {
  mockReportError.mockResolvedValueOnce({success: true})

  const {rerender, getByText, queryByText, getByRole, queryByRole} = render(
    <ErrorBoundary>
      <Bomb />
    </ErrorBoundary>,
  )

  // component is rerendered with a bomb that will expload
  rerender(
    <ErrorBoundary>
      <Bomb shouldThrow={true} />
    </ErrorBoundary>,
  )

  // asynmmetric matchers, ie. expect.any(Error),
  // {componentStack: expect.stringContaining("Bomb")}
  const error = expect.any(Error)
  //
  const info = {componentStack: expect.stringContaining('Bomb')}
  expect(mockReportError).toHaveBeenCalledWith(error, info)
  expect(mockReportError).toHaveBeenCalledTimes(1)

  // expect errors to pop up for error boundary, only 2x, once by JSDom, once by ReactDOM
  expect(console.error).toHaveBeenCalledTimes(2)

  // textContent is an attribute on the HTML element, same as type
  expect(getByRole('alert').textContent).toMatchInlineSnapshot(
    `"There was a problem."`,
  )

  // resets calls back to 0 but leaves mock implementation untouched
  console.error.mockClear()
  mockReportError.mockClear()

  // first we'll rerender the Bomb component, with props that disable the error throwing,
  // because if hasError isn't profided it defaults to undefined
  // component is rerendered with a bomb that will not expload
  // rerender won't update the DOM immediately it'll just update the props that
  // will be used to render the component on the next user interaction
  rerender(
    <ErrorBoundary>
      <Bomb />
    </ErrorBoundary>,
  )

  fireEvent.click(getByText(/try again/i))
  // before this can pass we need to clear the mocks
  // that have already been created in the same test
  expect(mockReportError).not.toHaveBeenCalled()
  expect(console.error).not.toHaveBeenCalled()

  expect(queryByRole('alert')).not.toBeInTheDocument()
  expect(queryByText(/try again/i)).not.toBeInTheDocument()
})
