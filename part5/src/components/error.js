import React from 'react'
import styled from 'styled-components'

const ErrorDiv = styled.div`
  color: red;
  background: lightgrey;
  font-size: 20px;
  border-style: solid;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
`



const Error = ({message}) => {
  if (message === null) {
    return null
  } else {
    return (
      <ErrorDiv>
        {message}
      </ErrorDiv>
    )
  }
}

export default Error