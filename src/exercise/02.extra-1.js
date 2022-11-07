// useEffect: persistent state
// 💯 lazy state initialization
// http://localhost:3000/isolated/final/02.extra-1.js

import * as React from 'react'

function Greeting({ initialName = '' }) {

  // useState with Lazy initialization. 
  // The operation is executed only one time, instead of multiple times if te initial state is calculated inside the function component and passed as a variable.
  // const initialState = getInitialStateCalculatingSomethingExpensive().
  const getInitialStateCalculatingSomethingExpensive = () => window.localStorage.getItem('name') ?? initialName
  const [name, setName] = React.useState(getInitialStateCalculatingSomethingExpensive)


  React.useEffect(() => {
    window.localStorage.setItem('name', name)
  })

  function handleChange(event) {
    setName(event.target.value)
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
