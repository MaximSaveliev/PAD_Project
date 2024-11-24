import React, { Component } from 'react'
// import AdminHeader from './AdminHeader'
import AdminSidebar from './AdminSidebar'
import AdminRoutes from '../../routes/AdminRoutes'

export class AdminLayout extends Component {
  render() {
    return (
      <>
        {/* <AdminHeader></AdminHeader> */}
        <AdminRoutes></AdminRoutes>
        <AdminSidebar></AdminSidebar>
      </>
    )
  }
}

export default AdminLayout