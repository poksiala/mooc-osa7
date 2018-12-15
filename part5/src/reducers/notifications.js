const notificationReducer = (state = null, action) => {
  switch (action.type) {
  case 'SET_NOTIFICATION':
    return action.notification
  case 'CLEAR_NOTIFICATION':
    return null
  default:
    return state
  }
}

const setNotification = notification => {
  return {
    type: 'SET_NOTIFICATION',
    notification
  }
}

const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION'
  }
}

export const notify = (notification, seconds) => {
  return (dispatch) => {
    dispatch(setNotification(notification))
    setTimeout(() => dispatch(clearNotification()), seconds * 1000)
  }
}

export default notificationReducer