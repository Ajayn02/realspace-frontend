import React from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';

function Side() {
  return (
    <>
      <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>
        <CDBSidebar textColor="#fff" backgroundColor="rgb(72, 50, 168)">
          <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
            <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
              Admin
            </a>
          </CDBSidebarHeader>

          <CDBSidebarContent className="sidebar-content">
            <CDBSidebarMenu>
            <NavLink exact to="/hero404" target="_blank" className="d-flex " activeClassName="activeClicked">
              <i className="fa-solid fa-magnifying-glass fa-lg ms-4 mt-4" />
                <CDBSidebarMenuItem >
                    Exit
                </CDBSidebarMenuItem>
              </NavLink>

              <NavLink exact to="/hero404" target="_blank" className="d-flex " activeClassName="activeClicked">
              <i className="fa-solid fa-magnifying-glass fa-lg ms-4 mt-4" />
                <CDBSidebarMenuItem >
                    Exit
                </CDBSidebarMenuItem>
              </NavLink>
             

              <NavLink exact to="/hero404" target="_blank" className="d-flex " activeClassName="activeClicked">
              <i className="fa-solid fa-magnifying-glass fa-lg ms-4 mt-4" />
                <CDBSidebarMenuItem >
                    Exit
                </CDBSidebarMenuItem>
              </NavLink>

              {/* <NavLink exact to="/analytics" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="chart-line">Analytics</CDBSidebarMenuItem>
              </NavLink> */}

            </CDBSidebarMenu>
          </CDBSidebarContent>

         
        </CDBSidebar>
      </div>

    </>
  )
}

export default Side