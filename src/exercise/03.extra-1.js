// Lifting state
// http://localhost:3000/isolated/exercise/03.js

import * as React from 'react'

function Name({ name, onNameChange }) {
  return (
    <div>
      <label htmlFor="name">Name: </label>
      <input id="name" value={name} onChange={onNameChange} />
    </div>
  )
}

// 🐨 accept `animal` and `onAnimalChange` props to this component
function FavoriteAnimal() {
  const [animal, setAnimal] = React.useState('')
  function handleOnChange(event) {
    setAnimal(event.target.value)
  }
  return (
    <div>
      <label htmlFor="animal">Favorite Animal: </label>
      <input
        id="animal"
        value={animal}
        onChange={handleOnChange}
      />
    </div>
  )
}

function Display({ name }) {
  return <div>{`Hey ${name}!`}</div>
}



function App() {
  const [name, setName] = React.useState('')
  return (
    <form>
      <Name name={name} onNameChange={event => setName(event.target.value)} />
      {/* 🐨 pass the animal and onAnimalChange prop here (similar to the Name component above) */}
      <FavoriteAnimal />
      {/* 🐨 pass the animal prop here */}
      <Display name={name} />
    </form>
  )
}

export default App
