import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'

// routes config
import routes from '../routes'
import authStore from '../store/auth'

const AppContent = () => {
  const { me } = authStore()
  const filteredRoutes = routes.filter((route) => {
    if (route.show) {
      return route.show.includes(me?.role?.int)
    }
    if (route.unshow) {
      return !route.unshow.includes(me?.role?.int)
    }
    return true
  })
  return (
    <CContainer className="px-4" lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          {filteredRoutes.map((route, idx) => {
            return (
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  element={<route.element />}
                />
              )
            )
          })}
          <Route path="/" element={<Navigate to="dashboard" replace />} />
        </Routes>
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppContent)
