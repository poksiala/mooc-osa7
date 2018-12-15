import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

const NotificationDiv = styled.div`
  background: green;
  padding: 10px;
`

const Notification = ({ notification }) => {
  if (notification === null) {
    return null
  } else {
    return (
      <NotificationDiv>
        {notification}
      </NotificationDiv>
    )
  }
}

const mapStateToProps = state => {
  return {
    notification: state.notification
  }
}

export default connect(
  mapStateToProps
)(Notification)