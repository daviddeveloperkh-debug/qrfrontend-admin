import {
  CBadge,
  CButton,
  CCallout,
  CCard,
  CCardBody,
  CCardGroup,
  CCardHeader,
  CCardTitle,
  CCol,
  CListGroup,
  CListGroupItem,
  CRow,
} from '@coreui/react'
import { useEffect } from 'react'
import { adminsStore, welderCertificatesStore } from '../../../store/index'
import { useParams } from 'react-router-dom'
import PageLoading from '../../../components/PageLoading/PageLoading'

const Show = () => {
  const { id } = useParams()
  const { getDetail, detailLoading, detail } = adminsStore()
  useEffect(() => {
    getDetail(id)
  }, [id])
  return (
    <CCard>
      {detailLoading ? (
        <PageLoading loading={true} />
      ) : (
        <>
          <CCardHeader>
            <CCardGroup className="align-items-center">
              <CCardTitle className="mb">
                {detail?.name} ( ID: {detail?.id} )
              </CCardTitle>
              <CButton href={`#/admins/edit/${detail?.id}`} color="primary" className="ms-auto">
                O'zgartirish
              </CButton>
            </CCardGroup>
          </CCardHeader>
          <CCardBody>
            <CRow xs={{ gutter: 2 }}>
              <CCol xs={{ span: 6 }}>
                <CCallout className="p-2 m-0" color="primary">
                  ИД
                </CCallout>
              </CCol>
              <CCol xs={{ span: 6 }}>
                <CListGroup>
                  <CListGroupItem className="p-2">{detail?.id}</CListGroupItem>
                </CListGroup>
              </CCol>
              <CCol xs={{ span: 6 }}>
                <CCallout className="p-2 m-0" color="primary">
                  Ismi
                </CCallout>
              </CCol>
              <CCol xs={{ span: 6 }}>
                <CListGroup>
                  <CListGroupItem className="p-2">{detail?.name}</CListGroupItem>
                </CListGroup>
              </CCol>
              <CCol xs={{ span: 6 }}>
                <CCallout className="p-2 m-0" color="primary">
                  Admin roli
                </CCallout>
              </CCol>
              <CCol xs={{ span: 6 }}>
                <CListGroup>
                  <CListGroupItem className="p-2">{detail?.role}</CListGroupItem>
                </CListGroup>
              </CCol>
              <CCol xs={{ span: 6 }}>
                <CCallout className="p-2 m-0" color="primary">
                  Login
                </CCallout>
              </CCol>
              <CCol xs={{ span: 6 }}>
                <CListGroup>
                  <CListGroupItem className="p-2">{detail?.login}</CListGroupItem>
                </CListGroup>
              </CCol>
            </CRow>
          </CCardBody>
        </>
      )}
    </CCard>
  )
}

export default Show
