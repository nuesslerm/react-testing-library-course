/*
 * Mock HTTP Requests with Dependency
 * Injection in React Component Tests
 */
import React from 'react'
import {render, fireEvent, waitFor} from '@testing-library/react'
import {GreetingLoader} from '../greeting-loader-02-dependency-injection'

// with dependency injection we're not mocking the entire module (ie. file)
// but rather we're just mocking one specific function
it('should load a greeting on click', async () => {
  const subject = 'Mary'
  const testGreeting = 'TEST_GREETING'
  const mockLoadGreeting = jest.fn()
  mockLoadGreeting.mockResolvedValueOnce({
    data: {greeting: `${testGreeting}_${subject}`},
  })
  // const mockLoadGreeting = jest.fn((subject) =>
  //   Promise.resolve({
  //     data: {greeting: `${testGreeting}_${subject}`},
  //   }),
  // )

  const {getByLabelText, getByText} = render(
    <GreetingLoader loadGreeting={mockLoadGreeting} />,
  )
  const nameInput = getByLabelText(/name/i)
  const loadButton = getByText(/load/i)
  nameInput.value = subject
  fireEvent.click(loadButton)

  await waitFor(() =>
    expect(getByLabelText(/greeting/i)).toHaveTextContent(
      `${testGreeting}_${subject}`,
    ),
  )

  expect(mockLoadGreeting).toHaveBeenCalledTimes(1)
  expect(mockLoadGreeting).toHaveBeenCalledWith('Mary')
})
