import CIcon from '@coreui/icons-react'
import { cilDollar, cilGradient, cilGroup } from '@coreui/icons'
import { CNavGroup, CNavItem } from '@coreui/react'

export const helperQuery = '?page=1&limit=20'
export const adminRole = 1
export const superAdminRole = 2
export const operatorRole = 3
export const buxgalterRole = 4
export const courierRole = 5
export const managerRole = 6

export const permissionRoles = [adminRole, superAdminRole, managerRole, buxgalterRole]

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: `/`,
    icon: <CIcon icon={cilGradient} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Studentlar',
    to: `/user${helperQuery}`,
    icon: <CIcon icon={cilGroup} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Adminlar',
    to: `/admins${helperQuery}`,
    icon: <CIcon icon={cilGroup} customClassName="nav-icon" />,
  },
  // {
  //   component: CNavItem,
  //   name: 'Сертификаты',
  //   to: `/welder-certificates${helperQuery}`,
  //   icon: <CIcon icon={cilDollar} customClassName="nav-icon" />,
  // },
]

export default _nav
