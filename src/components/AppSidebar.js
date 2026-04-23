import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  CAvatar,
  CBadge,
  CCloseButton,
  CSidebar,
  CSidebarBrand,
  CSidebarFooter,
  CSidebarHeader,
  CSidebarToggler,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { AppSidebarNav } from './AppSidebarNav'

import { logo } from 'src/assets/brand/logo'
import { sygnet } from 'src/assets/brand/sygnet'

// sidebar nav config
import navigation from '../_nav'
import { IMAGES } from '../assets/images'
import { cilElevator } from '@coreui/icons'
import authStore from '../store/auth'
import _nav from '../_nav'
import { Link } from 'react-router-dom'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)
  const { me, meLoading } = authStore()

  function filterNavItems(items, role) {
    return items
      .filter((item) => {
        if (!item.unshow) return true
        return !item.unshow.includes(role)
      })
      .map((item) => {
        if (item.items) {
          return {
            ...item,
            items: filterNavItems(item.items, role), // rekursiv chaqirish
          }
        }
        return item
      })
  }

  const filteredNav = filterNavItems(_nav, me?.role?.int)

  return (
    <CSidebar
      className="border-end"
      colorScheme="dark"
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarHeader className="border-bottom">
        <Link to="/dashboard">
          {/* <img className="w-75" src={IMAGES.logo} alt="" /> */}
          {/* <CIcon customClassName="sidebar-brand-full" icon={logo} height={32} />
          <CIcon customClassName="sidebar-brand-narrow" icon={sygnet} height={32} /> */}
        </Link>
        <CCloseButton
          className="d-lg-none"
          dark
          onClick={() => dispatch({ type: 'set', sidebarShow: false })}
        />
      </CSidebarHeader>

      <div className="sidebar-user">
        {/* <CAvatar status={userStatusMap[me?.status?.int]} size="md" src={IMAGES.user} /> */}
        {me?.name}
        {/* <CBadge color="primary" className="s-auto" size="24px">
          Бухгалтер
        </CBadge> */}
        <CIcon icon={cilElevator} className="ms-auto" />
      </div>
      {!meLoading ? <AppSidebarNav items={filteredNav} /> : null}
      {/* <CSidebarFooter className="border-top d-none d-lg-flex">
        <CSidebarToggler
          onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
        />
      </CSidebarFooter> */}
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
