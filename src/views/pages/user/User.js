import { CButton, CCard, CCardHeader, CRow, CCol, CCardTitle, CSpinner } from '@coreui/react'
import Table from './Table'
import { Link } from 'react-router-dom'
import { userStore } from '../../../store/index'
import { useState } from 'react'
import { buxgalterRole, managerRole } from '../../../_nav'
import { unshowElement } from '../../../utils'
import authStore from '../../../store/auth'
import { toast } from 'react-toastify'
import { error403Text } from '../../../helpers/errors'

const User = () => {
  const { downloadExcel, downloadLoading } = userStore()
  const { me } = authStore()
  return (
    <>
      <CCard>
        <CCardHeader>
          <CRow>
            <CCol className="d-flex align-items-center">
              <CCardTitle className="mb-0">Пользователы</CCardTitle>
            </CCol>
            <CCol className="d-flex justify-content-end gap-2">
              <Link to="/user/create">
                <CButton color="primary">Создать</CButton>
              </Link>
              {/* <CButton
                color="primary"
                onClick={() => {
                  const data = { ...params }
                  downloadExcel(data).then((data) => {
                    if (data?.status >= 200 && data?.status <= 300) {
                      const url = window.URL.createObjectURL(
                        new Blob([data?.data], {
                          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                        }),
                      )
                      const link = document.createElement('a')
                      link.href = url
                      link.setAttribute('download', 'Пользователи.xlsx')
                      document.body.appendChild(link)
                      link.click()
                      document.body.removeChild(link)
                      window.URL.revokeObjectURL(url)
                    }
                    if (data?.status === 403) {
                      toast.error(error403Text)
                    }
                  })
                }}
                disabled={downloadLoading}
              >
                {downloadLoading ? <CSpinner size="sm" /> : null}
                Скачать в Excel
              </CButton> */}
            </CCol>
          </CRow>
        </CCardHeader>
        <Table />
      </CCard>
    </>
  )
}

export default User
