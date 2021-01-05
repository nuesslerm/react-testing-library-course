import * as React from 'react'
// we avoid variable shadowing problem
// (because loadGreeting prop has same name as the loadGreeting api function)
// by importing * as api, and using api.loadGreeting
import * as api from './api'

// use dependency injection for environments that don't support jest.mock (e.g. story-book)
// those environments usually allow you to get an API as a component prop
// GreetingLoader was originally without props
// GreetingLoader(), but now we inject the dependency loadGreeting
// we pass it as default prop so we don't have to update it anywhere else in our code

// by using dependency injection we can support not only jest testing environments
// but also other environments like e.g. react-storybook
function GreetingLoader({loadGreeting = api.loadGreeting}) {
  const [greeting, setGreeting] = React.useState('')
  async function loadGreetingForInput(e) {
    e.preventDefault()
    const {data} = await loadGreeting(e.target.elements.name.value)
    setGreeting(data.greeting)
  }
  return (
    <form onSubmit={loadGreetingForInput}>
      <label htmlFor="name">Name</label>
      <input id="name" />
      <button type="submit">Load Greeting</button>
      <div aria-label="greeting">{greeting}</div>
    </form>
  )
}

export {GreetingLoader}
