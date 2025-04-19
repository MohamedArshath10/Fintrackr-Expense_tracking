import React, { useContext } from 'react'
import { UserContext } from '../../Context/useContext'
import ResponsiveNavbarWithSidebar from './Navbar'
import SideMenu from './SideMenu'

const DashboardLayout = ({ children, activeMenu }) => {
  const { user } = useContext(UserContext)

  return (
    <div className="">
      <ResponsiveNavbarWithSidebar activeMenu={activeMenu} />

      {user && (
        <div className="flex">
          {/* Show SideMenu only on large screens */}
          <div className="hidden lg:block w-64">
            <SideMenu activeMenu={activeMenu} />
          </div>

          {/* Main content */}
          <div className="flex-grow mx-5">
            {children}
          </div>
        </div>
      )}
    </div>
  )
}

export default DashboardLayout
