import React from 'react';

const actionFor = {
  vote(id) {
    return {
      type: 'VOTE',
      data: { id }
    }
  },
  newAnectode(anecdote) {
    return {
      type: 'NEW_ANECDOTE',
      data: { anecdote }
    }
  }
}

class App extends React.Component {

  vote = (id) => () => {
    this.props.store.dispatch(
      actionFor.vote(id)  
    )
  }  
  
  newAnectode = (event) => {
    event.preventDefault()
    this.props.store.dispatch(
      actionFor.newAnectode(
        event.target.anecdote.value
      )
    )
    event.target.anecdote.value = ''
  }

  render() {
    const anecdotes = this.props.store.getState()
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote=>
          <div key={anecdote.id}>
            <div>
              {anecdote.content} 
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={this.vote(anecdote.id)}>vote</button>
            </div>
          </div>
        )}
        <h2>create new</h2>
        <form onSubmit={this.newAnectode}>
          <div><input name="anecdote"/></div>
          <button type="submit">create</button> 
        </form>
      </div>
    )
  }
}

export default App