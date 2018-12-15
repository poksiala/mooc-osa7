import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = props => {
  return(
    <div>     
      <form onSubmit={props.handleSubmit}>
        <div>
          username:
          <input
            type="text"
            name="username"
            value={props.username}
            onChange={props.handleChange}
          />
        </div>
        <div>
          password:
          <input
            type="password"
            name="password"
            value={props.password}
            onChange={props.handleChange}
          />
        </div>
        <button type="submit">kirjaudu</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}


export default LoginForm