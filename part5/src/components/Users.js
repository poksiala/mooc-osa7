import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table, Header } from 'semantic-ui-react'

const Users = ({ users }) => {
  const userList = users.map(user =>
    <Table.Row key={user.id}>
      <Table.Cell>
        <Link to={`/users/${user.id}`}>{user.name}</Link>
      </Table.Cell>
      <Table.Cell>
        {user.blogs.length}
      </Table.Cell>
    </Table.Row>
  )

  return (
    <div>
      <Header as='h2'>Users</Header>
      <Table striped celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Full Name</Table.HeaderCell>
            <Table.HeaderCell>Number of Blog Posts</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {userList}
        </Table.Body>
      </Table>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}

export default connect(
  mapStateToProps
)(Users)