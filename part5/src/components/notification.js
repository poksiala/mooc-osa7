import React from 'react'
import styled from 'styled-components'

const NotificationDiv = styled.div`
  background: green;
  padding: 10px;
`

const Notification = ({message}) => {
  if (message === null) {
    return null
  } else {
    return (
      <NotificationDiv>
        {message}
      </NotificationDiv>
    )
  }
}

export default Notification