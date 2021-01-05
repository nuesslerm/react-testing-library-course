import * as React from 'react'
import {CSSTransition} from 'react-transition-group'

// props = {in, children}
function Fade(props) {
  return (
    <CSSTransition unmountOnExit timeout={3000} classNames="fade" {...props} />
  )
}

function HiddenMessage({children}) {
  const [show, setShow] = React.useState(false)
  const toggle = () => setShow((prevValue) => !prevValue)
  return (
    <div>
      <button onClick={toggle}>Toggle</button>
      <Fade in={show}>
        <div>{children}</div>
      </Fade>
    </div>
  )
}

export {HiddenMessage}
