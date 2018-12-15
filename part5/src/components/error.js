import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

const ErrorDiv = styled.div`
  color: red;
  background: lightgrey;
  font-size: 20px;
  border-style: solid;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
`



const Error = ({ err }) => {
  if (err === null) {
    return null
  } else {
    return (
      <ErrorDiv>
        {err}
      </ErrorDiv>
    )
  }
}

const mapStateToProps = state => {
  return {
    err: state.error
  }
}

export default connect(
  mapStateToProps
)(Error)