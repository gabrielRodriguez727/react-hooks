// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
import { fetchPokemon, PokemonForm, PokemonDataView, PokemonInfoFallback } from '../pokemon'

function PokemonInfo({ pokemonName }) {
  const [pokemon, setPokemon] = React.useState(null)
  const [error, setError] = React.useState(null)
  React.useEffect(() => {
    // option 1: using .catch
    // This option will catch the error caused by fetchPokemon API and by setPokemon function
    // fetchPokemon(pokemonName)
    //   .then(pokemon => setPokemon(pokemon))
    //   .catch(error => setError(error))

    // option 2: using the second argument to .then
    // This option will only catch the error caused by fetchPokemon API
    // Choose option 2, since errors caused by React are self-managed.
    fetchPokemon(pokemonName).then(
      pokemon => setPokemon(pokemon),
      error => setError(error),
    )
  }, [pokemonName])

  if (!pokemonName) return 'Submit a pokemon'
  if (error) return (
    <div role="alert">
      There was an error: <pre style={{ whiteSpace: 'normal' }}>{error.message}</pre>
    </div>
  )
  return pokemon ? <PokemonDataView pokemon={pokemon} /> : <PokemonInfoFallback name={pokemonName} />
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    </div>
  )
}

export default App
