import * as React from 'react'

function FavoriteNumber({min = 1, max = 9}) {
  const [number, setNumber] = React.useState(0)
  const [numberEntered, setNumberEntered] = React.useState(false)
  function handleChange(event) {
    setNumber(Number(event.target.value))
    setNumberEntered(true)
  }
  const isValid = !numberEntered || (number >= min && number <= max)
  return (
    <div>
      {/* Since for is a reserved word in JavaScript, React elements use htmlFor instead. */}
      {/* use htmlFor on your React element, for will end up in the DOM. */}
      <label htmlFor="favorite-number">favorite Number</label>
      <input
        id="favorite-number"
        type="number"
        value={number}
        onChange={handleChange}
      />
      {isValid ? null : (
        <div role="alert" data-testid="error-message">
          The number is invalid
        </div>
      )}
    </div>
  )
}

export {FavoriteNumber}
