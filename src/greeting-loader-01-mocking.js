import * as React from 'react'
import {loadGreeting} from './api'

function GreetingLoader() {
  const [greeting, setGreeting] = React.useState('')
  async function loadGreetingForInput(e) {
    e.preventDefault()
    const name = e.target.elements.name
    // output from a form submit is e.target.elements
    // as list of input elements matched to name="", or id="" (?)
    const {data} = await loadGreeting(name.value)
    // console.log(e.target.elements.name.value)
    setGreeting(data.greeting)
  }
  return (
    <form onSubmit={loadGreetingForInput}>
      <label htmlFor="name-input">Name</label>
      <input id="name-input" name="name" />
      <button type="submit">Load Greeting</button>
      <div aria-label="greeting">{greeting}</div>
    </form>
  )
}

export {GreetingLoader}
