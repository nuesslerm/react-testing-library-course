import * as React from 'react'
import {render} from '@testing-library/react'
// import 'jest-axe/extend-expect'
// import {axe, toHaveNoViolations} from 'jest-axe'
import {axe} from 'jest-axe'

// expect.extend(toHaveNoViolations)

function InaccessibleImage() {
  return (
    <div>
      <img src="#" />
    </div>
  )
}

function AccessibleImage() {
  return (
    <div>
      <img src="#" alt="something" />
    </div>
  )
}

function InaccessibleForm() {
  return (
    <form>
      {/* <input placeholder="email" /> */}
      <input name="email" />
    </form>
  )
}

function AccessibleForm() {
  return (
    <form>
      <label htmlFor="email">Please enter your email</label>
      <input placeholder="Please enter your email" id="email" type="text" />
    </form>
  )
}

it('image should be accessible', async () => {
  const {container} = render(<AccessibleImage />)
  const results = await axe(container)
  // expect(results.violations).toHaveLength(0)
  expect(results).toHaveNoViolations()
})

it('form should be accessible', async () => {
  const {container} = render(<AccessibleForm />)
  const results = await axe(container)
  // expect(results.violations).toHaveLength(0)
  expect(results).toHaveNoViolations()
})
