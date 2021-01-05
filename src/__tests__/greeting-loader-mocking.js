import React from 'react'
import {render, fireEvent, act, wait, waitFor} from '@testing-library/react'
import {loadGreeting as mockLoadGreeting} from '../api'
import {GreetingLoader} from '../greeting-loader-01-mocking'

// mock single module
jest.mock('../api')

it('should load a greeting on click', async () => {
  const subject = 'Mary'
  const testGreeting = 'TEST_GREETING'
  mockLoadGreeting.mockResolvedValueOnce({
    data: {greeting: `${testGreeting}_${subject}`},
  })

  const {getByLabelText, getByText, debug} = render(<GreetingLoader />)
  const nameInput = getByLabelText(/name/i)
  const loadButton = getByText(/load/i)
  nameInput.value = subject
  fireEvent.click(loadButton)

  // await waitFor() is the same as await wait(), but wait() is deprecated
  // wait is a warpper for act(), which makes sure to await the component's state update
  // before moving on in the test
  await waitFor(() =>
    expect(getByLabelText(/greeting/i)).toHaveTextContent(
      `${testGreeting}_${subject}`,
    ),
  )

  expect(mockLoadGreeting).toHaveBeenCalledTimes(1)
  expect(mockLoadGreeting).toHaveBeenCalledWith('Mary')

  mockLoadGreeting.mockResolvedValueOnce({
    data: {greeting: `EYO`},
  })

  // nameInput.value = 'Markus'
  // const loadButton2 = getByText(/load/i)
  fireEvent.click(loadButton)
  // * debug()
  // await waitFor(() =>
  //   expect(getByLabelText(/greeting/i)).toHaveTextContent(`Markus`),
  // )
  await waitFor(() =>
    expect(getByLabelText(/greeting/i)).toHaveTextContent(`EY`),
  )
  // * debug()
  expect(mockLoadGreeting).toHaveBeenCalledTimes(2)
  expect(mockLoadGreeting).toHaveBeenCalledWith('Mary')
})

// calling jest.mock() with the module factory parameter:
// jest.mock('../api', () => {
//   return {
//     loadGreeting: jest.fn((subject) =>
//       Promise.resolve({data: {greeting: `TEST_GREETING_${subject}`}}),
//     ),
//   }
// })

// it('should load a greeting on click', async () => {
//   // mockLoadGreeting.mockResolvedValueOnce({data: {greeting: 'TEST_GREETING'}})

//   const {getByLabelText, getByText} = render(<GreetingLoader />)
//   const nameInput = getByLabelText(/name/i)
//   const loadButton = getByText(/load/i)
//   nameInput.value = 'Mary'
//   fireEvent.click(loadButton)

//   // await waitFor() is the same as await wait(), but wait() is deprecated
//   // wait is a warpper for act(), which makes sure to await the component's state update
//   // before moving on in the test
//   await waitFor(() =>
//     expect(getByLabelText(/greeting/i)).toHaveTextContent('TEST_GREETING_Mary'),
//   )

//   expect(mockLoadGreeting).toHaveBeenCalledTimes(1)
//   expect(mockLoadGreeting).toHaveBeenCalledWith('Mary')
// })
