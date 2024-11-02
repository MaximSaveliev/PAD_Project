import { Component } from 'react'
import UserHeader from './UserHeader'
import UserFooter from './UserFooter'
import UserRoutes from '../../routes/UserRoutes'

export class UserLayout extends Component {
  render() {
    return (
      <>
        <UserHeader></UserHeader>
        <UserRoutes></UserRoutes>
        <UserFooter></UserFooter>
      </>
    )
  }
}

export default UserLayout