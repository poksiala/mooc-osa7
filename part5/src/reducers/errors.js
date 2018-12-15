const errorReducer = (state = null, action) => {
  switch (action.type) {
  case 'SET_ERROR':
    return action.err
  case 'CLEAR_ERROR':
    return null
  default:
    return state
  }
}

const setError = err => {
  return {
    type: 'SET_ERROR',
    err
  }
}

const clearError = () => {
  return {
    type: 'CLEAR_ERROR'
  }
}

export const showError = (err, seconds = 3) => {
  return (dispatch) => {
    dispatch(setError(err))
    setTimeout(() => dispatch(clearError()), seconds * 1000)
  }
}

export default errorReducer