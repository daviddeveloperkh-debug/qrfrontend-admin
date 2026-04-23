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
import { welderCertificatesStore } from '../../../store/index'
import { useParams } from 'react-router-dom'
import PageLoading from '../../../components/PageLoading/PageLoading'

const Show = () => {
  const { id } = useParams()
  const { getDetail, detailLoading, detail } = welderCertificatesStore()
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
              <CButton
                href={`#/welder-certificates/edit/${detail?.id}`}
                color="primary"
                className="ms-auto"
              >
                Изменить
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
                  Сертификат
                </CCallout>
              </CCol>
              <CCol xs={{ span: 6 }}>
                <CListGroup>
                  <CListGroupItem className="p-2">{detail?.certificatesName}</CListGroupItem>
                </CListGroup>
              </CCol>
              <CCol xs={{ span: 6 }}>
                <CCallout className="p-2 m-0" color="primary">
                  Номер сертификат
                </CCallout>
              </CCol>
              <CCol xs={{ span: 6 }}>
                <CListGroup>
                  <CListGroupItem className="p-2">{detail?.certificateNo}</CListGroupItem>
                </CListGroup>
              </CCol>
              <CCol xs={{ span: 6 }}>
                <CCallout className="p-2 m-0" color="primary">
                  Город
                </CCallout>
              </CCol>
              <CCol xs={{ span: 6 }}>
                <CListGroup>
                  <CListGroupItem className="p-2">{detail?.city}</CListGroupItem>
                </CListGroup>
              </CCol>
              <CCol xs={{ span: 6 }}>
                <CCallout className="p-2 m-0" color="primary">
                  Дата выдачи
                </CCallout>
              </CCol>
              <CCol xs={{ span: 6 }}>
                <CListGroup>
                  <CListGroupItem className="p-2">{detail?.issueDate}</CListGroupItem>
                </CListGroup>
              </CCol>
              <CCol xs={{ span: 6 }}>
                <CCallout className="p-2 m-0" color="primary">
                  Дата истечения
                </CCallout>
              </CCol>
              <CCol xs={{ span: 6 }}>
                <CListGroup>
                  <CListGroupItem className="p-2">{detail?.expiryDate}</CListGroupItem>
                </CListGroup>
              </CCol>
              <CCol xs={{ span: 6 }}>
                <CCallout className="p-2 m-0" color="primary">
                  Орган выдающий
                </CCallout>
              </CCol>
              <CCol xs={{ span: 6 }}>
                <CListGroup>
                  <CListGroupItem className="p-2">{detail?.issuingBody}</CListGroupItem>
                </CListGroup>
              </CCol>
              <CCol xs={{ span: 6 }}>
                <CCallout className="p-2 m-0" color="primary">
                  Практическая оценка
                </CCallout>
              </CCol>
              <CCol xs={{ span: 6 }}>
                <CListGroup>
                  <CListGroupItem className="p-2">{detail?.practiceGrade}</CListGroupItem>
                </CListGroup>
              </CCol>
              <CCol xs={{ span: 6 }}>
                <CCallout className="p-2 m-0" color="primary">
                  Теоретическая оценка
                </CCallout>
              </CCol>
              <CCol xs={{ span: 6 }}>
                <CListGroup>
                  <CListGroupItem className="p-2">{detail?.theoryGrade}</CListGroupItem>
                </CListGroup>
              </CCol>
              <CCol xs={{ span: 6 }}>
                <CCallout className="p-2 m-0" color="primary">
                  Время
                </CCallout>
              </CCol>
              <CCol xs={{ span: 6 }}>
                <CListGroup>
                  <CListGroupItem className="p-2">{detail?.createdAt}</CListGroupItem>
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
