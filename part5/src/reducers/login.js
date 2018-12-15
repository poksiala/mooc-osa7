const loginReducer = (state = null, action) => {
  switch (action.type) {
  case 'LOGIN':
    return action.user
  case 'LOGOUT':
    return null
  default:
    return state
  }
}

export const loginUser = user => {
  return {
    type: 'LOGIN',
    user
  }
}

export const logoutUser = () => {
  return {
    type: 'LOGOUT'
  }
}


export default loginReducer