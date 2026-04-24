import { CButton, CCard, CCardHeader, CRow, CCol, CCardTitle, CSpinner } from '@coreui/react'
import Table from './Table'
import { Link } from 'react-router-dom'

const Admins = () => {
  return (
    <>
      <CCard>
        <CCardHeader>
          <CRow>
            <CCol className="d-flex align-items-center">
              <CCardTitle className="mb-0">Adminlar</CCardTitle>
            </CCol>
            <CCol className="d-flex justify-content-end gap-2">
              <Link to="/admins/create">
                <CButton color="primary">Yaratish</CButton>
              </Link>
            </CCol>
          </CRow>
        </CCardHeader>
        <Table />
      </CCard>
    </>
  )
}

export default Admins
