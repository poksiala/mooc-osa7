import React from 'react'
import ReactDOM from 'react-dom'
import counterReducer from './reducer'
import {createStore} from 'redux'

const store = createStore(counterReducer)

store.subscribe( () => console.log(store.getState()))

const Statistiikka = () => {
  const {good, ok, bad} = store.getState()
  const palautteita = good + ok + bad
  
  if (palautteita === 0) {
    return (
      <div>
        <h2>stataistiikka</h2>
        <div>ei yhtään palautetta annettu</div>
      </div>
    )
  }

  return (
    <div>
      <h2>statistiikka</h2>
      <table>
        <tbody>
          <tr>
            <td>hyvä</td>
            <td>{good}</td>
          </tr>
          <tr>
            <td>neutraali</td>
            <td>{ok}</td>
          </tr>
          <tr>
            <td>huono</td>
            <td>{bad}</td>
          </tr>
          <tr>
            <td>keskiarvo</td>
            <td>{(good - bad)/palautteita}</td>
          </tr>
          <tr>
            <td>positiivisia</td>
            <td>{good/palautteita}</td>
          </tr>
        </tbody>
      </table>

      <button>nollaa tilasto</button>
    </div >
  )
}

class App extends React.Component {

  componentDidMount() {
    store.subscribe(() => this.forceUpdate())
  }

  klik = (nappi) => {
    return( 
      () => {
        store.dispatch({type: nappi})
      }
    )
  }

  render() {
    return (
      <div>
        <h2>anna palautetta</h2>
        <button onClick={this.klik('GOOD')}>hyvä</button>
        <button onClick={this.klik('OK')}>neutraali</button>
        <button onClick={this.klik('BAD')}>huono</button>
        <Statistiikka />
      </div>
    )
  }

}

export default App
