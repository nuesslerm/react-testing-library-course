import React from 'react'
import {render, fireEvent} from '@testing-library/react'
import {reportError as mockReportError} from '../api'
import {ErrorBoundary} from '../error-boundary'

jest.mock('../api')

function Bomb({shouldThrow}) {
  if (shouldThrow) {
    throw new Error('💣')
  } else {
    return null
  }
}

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {})
})

afterAll(() => {
  console.error.mockRestore()
})

afterEach(() => {
  jest.clearAllMocks()
})

it('sohuld call reportError and render that there was a problem', () => {
  mockReportError.mockResolvedValueOnce({success: true})

  // use wrapper property in render() to clean up repetitive rerender code
  // the wrapper component provided in the wrapper option will warp the component
  // that is provided as the first argument
  const {
    rerender,
    getByText,
    queryByText,
    getByRole,
    queryByRole,
  } = render(<Bomb />, {wrapper: ErrorBoundary})

  rerender(<Bomb shouldThrow={true} />)

  const error = expect.any(Error)

  const info = {componentStack: expect.stringContaining('Bomb')}
  expect(mockReportError).toHaveBeenCalledWith(error, info)
  expect(mockReportError).toHaveBeenCalledTimes(1)

  expect(console.error).toHaveBeenCalledTimes(2)

  expect(getByRole('alert').textContent).toMatchInlineSnapshot(
    `"There was a problem."`,
  )

  console.error.mockClear()
  mockReportError.mockClear()

  rerender(<Bomb />)

  fireEvent.click(getByText(/try again/i))

  expect(mockReportError).not.toHaveBeenCalled()
  expect(console.error).not.toHaveBeenCalled()

  expect(queryByRole('alert')).not.toBeInTheDocument()
  expect(queryByText(/try again/i)).not.toBeInTheDocument()
})
