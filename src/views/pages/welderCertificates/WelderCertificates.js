import { CButton, CCard, CCardHeader, CRow, CCol, CCardTitle } from '@coreui/react'
import Table from './Table'
import { Link } from 'react-router-dom'

const WelderCertificates = () => {
  return (
    <>
      <CCard>
        <CCardHeader>
          <CRow>
            <CCol className="d-flex align-items-center">
              <CCardTitle className="mb-0">Сертификаты</CCardTitle>
            </CCol>
            <CCol className="d-flex justify-content-end">
              <Link to="/welder-certificates/create">
                <CButton color="primary">Создать</CButton>
              </Link>
            </CCol>
          </CRow>
        </CCardHeader>
        <Table />
      </CCard>
    </>
  )
}

export default WelderCertificates
