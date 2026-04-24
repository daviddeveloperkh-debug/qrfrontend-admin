import React from 'react'
import { buxgalterRole, managerRole } from './_nav'

// DASHBOARD
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

// USER
const User = React.lazy(() => import('./views/pages/user/User'))
const UserShow = React.lazy(() => import('./views/pages/user/Show'))
const UserCreate = React.lazy(() => import('./views/pages/user/Create'))
const UserEdit = React.lazy(() => import('./views/pages/user/Edit'))

// ADMINS
const Admins = React.lazy(() => import('./views/pages/admins/Admins'))
const AdminsShow = React.lazy(() => import('./views/pages/admins/Show'))
const AdminsCreate = React.lazy(() => import('./views/pages/admins/Create'))
const AdminsEdit = React.lazy(() => import('./views/pages/admins/Edit'))

// WELDER CERTIFICATES
const WelderCertificates = React.lazy(
  () => import('./views/pages/welderCertificates/WelderCertificates'),
)
const WelderCertificatesShow = React.lazy(() => import('./views/pages/welderCertificates/Show'))
const WelderCertificatesCreate = React.lazy(() => import('./views/pages/welderCertificates/Create'))
const WelderCertificatesEdit = React.lazy(() => import('./views/pages/welderCertificates/Edit'))

const routes = [
  { path: '/', exact: true, name: '', element: Dashboard },
  { path: '/user', name: 'Foydalanuvchilar', element: User },
  { path: '/user/:id', name: 'Foydalanuvchi', element: UserShow },
  {
    path: '/user/create',
    name: 'Foydalanuvchi yaratish',
    element: UserCreate,
  },
  {
    path: '/user/edit/:id',
    name: 'Foydalanuvchi tahrirlash',
    element: UserEdit,
  },
  { path: '/admins', name: 'Adminlar', element: Admins },
  { path: '/admins/:id', name: 'Admin', element: AdminsShow },
  {
    path: '/admins/create',
    name: 'Admin yaratish',
    element: AdminsCreate,
  },
  {
    path: '/admins/edit/:id',
    name: 'Admin tahrirlash',
    element: AdminsEdit,
  },
  // {
  //   path: '/welder-certificates',
  //   name: 'Сертификаты',
  //   element: WelderCertificates,
  // },
  // {
  //   path: '/welder-certificates/:id',
  //   name: 'Сертификат',
  //   element: WelderCertificatesShow,
  // },
  // {
  //   path: '/welder-certificates/create',
  //   name: 'Создать сертификат',
  //   element: WelderCertificatesCreate,
  // },
  // {
  //   path: '/welder-certificates/edit/:id',
  //   name: 'Изменить сертификат',
  //   element: WelderCertificatesEdit,
  // },
]

export default routes
