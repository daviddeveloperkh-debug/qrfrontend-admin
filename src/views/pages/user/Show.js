import {
  CBadge,
  CButton,
  CCallout,
  CCard,
  CCardBody,
  CCardGroup,
  CCardHeader,
  CCardImage,
  CCardSubtitle,
  CCardTitle,
  CCol,
  CFormInput,
  CFormLabel,
  CListGroup,
  CListGroupItem,
  CRow,
} from '@coreui/react'
import { useEffect, useMemo, useState } from 'react'
import { unshowElement } from '../../../utils'
import { userStore, welderCertificatesStore } from '../../../store/index'
import { useParams } from 'react-router-dom'
import PageLoading from '../../../components/PageLoading/PageLoading'
import { IMAGES } from '../../../assets/images'
import CIcon from '@coreui/icons-react'
import { cilAvTimer, cilBadge, cilCode, cilPhone } from '@coreui/icons'
import { buxgalterRole, managerRole } from '../../../_nav'
import authStore from '../../../store/auth'
import Error403 from '../../base/forbidden/Error403'
import { APP_URL, SITE_URL } from '../../../config'
import Select from '../../forms/select/Select'
import QRCode from 'react-qr-code'
import { usePDF } from '@react-pdf/renderer'
import Pdf from '../../pdf/Pdf'
import { CLoadingButton } from '@coreui/react-pro'
import { useSearchParams } from 'react-router-dom'

const Show = () => {
  const { id } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const { getDetail, detailLoading, detail } = userStore()
  console.log(detail)

  // const {
  //   getDetail: getWelderCertificatesDetail,
  //   detail: welderCertificatesDetail,
  //   detailLoading: welderCertificatesDetailLoading,
  //   getStatics: getWelderCertificatesStatics,
  //   statics: welderCertificatesStatics,
  //   staticsLoading: welderCertificatesStaticsLoading,
  // } = welderCertificatesStore()
  const [qrTitle, setQrTitle] = useState('')
  const qrLink = detail?.id
    ? `${SITE_URL}/user/${detail.id}?year=${searchParams.get('year')}`
    : null

  const document = useMemo(() => {
    return qrLink ? <Pdf qrLink={qrLink} title={qrTitle} /> : null
  }, [qrLink, qrTitle])
  const [instance, updateInstance] = usePDF({ document })
  const refreshPDF = () => {
    updateInstance(document)
  }
  const handlePrint = () => {
    if (instance.url) {
      window.open(instance.url, '_blank')
    }
  }
  useEffect(() => {
    refreshPDF()
  }, [detail, qrTitle, qrLink])
  useEffect(() => {
    if (document) {
      updateInstance(document)
    }
  }, [document])
  useEffect(() => {
    getDetail({ year: searchParams.get('year'), id })
  }, [searchParams])
  // useEffect(() => {
  //   getWelderCertificatesStatics()
  // }, [])
  console.log(detail)

  return (
    <>
      {detailLoading ? (
        <PageLoading loading={true} />
      ) : (
        <>
          {detail?.id ? (
            <CRow className="mb-4">
              <CCol xl={6}>
                <CCard>
                  <CCardHeader>
                    <CCardGroup className="align-items-center justify-content-between">
                      <CCardTitle className="mb">
                        {detail?.name} ( ID: {detail?.id} )
                      </CCardTitle>
                      <CButton
                        href={`#/user/edit/${detail?.id}?year=${detail?.year}`}
                        color="info"
                        className="text-white"
                      >
                        Изменить
                      </CButton>
                    </CCardGroup>
                  </CCardHeader>
                  <CCardImage
                    src={APP_URL + detail?.photo}
                    style={{
                      height: '160px',
                      width: 'auto',
                      maxWidth: 'max-content',
                      margin: '1rem auto',
                      objectFit: 'contain',
                    }}
                  />
                  <CCardTitle className="text-center">
                    {detail?.firstName} {detail?.lastName} {detail?.patronymic}
                  </CCardTitle>
                  <CBadge
                    shape="rounded-pill"
                    color="info"
                    style={{ width: 'max-content', margin: '1rem auto' }}
                  >
                    {detail?.specialty}
                    <CIcon icon={cilBadge} />
                  </CBadge>
                  <div className="passport mx-auto">
                    {detail?.passportNumber?.slice(0, 2)} | {detail?.passportNumber?.slice(2, 10)}
                  </div>
                  <CCardBody>
                    <CRow>
                      <CCol>
                        Данный
                        <CCallout color="info" className="mt-1 py-1">
                          {detail?.given}
                        </CCallout>
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol>
                        Номер сертификата
                        <CCallout color="info" className="mt-1 py-1">
                          {detail?.certificateNumber}
                        </CCallout>
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol sm={6}>
                        Номер протокола
                        <CCallout color="info" className="mt-1 py-1">
                          {detail?.protocolNumber}
                        </CCallout>
                      </CCol>
                      <CCol sm={6}>
                        Дата регистрации протокола
                        <CCallout color="info" className="mt-1 py-1">
                          {detail?.protocolRegistrationDate}
                        </CCallout>
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol>
                        Председатель комиссии
                        <CCallout color="info" className="mt-1 py-1">
                          {detail?.commissionChairman}
                        </CCallout>
                      </CCol>
                    </CRow>
                    <CCardSubtitle className="mb-3">Данные пользователя</CCardSubtitle>
                    <CListGroup className="user-list">
                      <CListGroupItem>
                        Дата рождения
                        <div>{detail?.birthDate}</div>
                      </CListGroupItem>
                      <CListGroupItem>
                        Квалификация
                        <div>{detail?.qualification}</div>
                      </CListGroupItem>
                      <CListGroupItem>
                        Дата создания
                        <CIcon icon={cilAvTimer} />
                        <div>{detail?.createdAt}</div>
                      </CListGroupItem>
                    </CListGroup>
                  </CCardBody>
                </CCard>
              </CCol>
              <CCol xl={6}>
                <CCard>
                  <CCardHeader className="d-flex align-items-center">
                    <CCardTitle>Линк</CCardTitle>
                    {!instance.error ? (
                      <CLoadingButton
                        loading={instance.loading}
                        disabled={instance.loading}
                        color="primary"
                        className="ms-auto"
                        onClick={handlePrint}
                      >
                        Печать
                      </CLoadingButton>
                    ) : null}
                  </CCardHeader>
                  <CCardBody>
                    <div
                      style={{ border: '1px solid', borderRadius: '4px', width: 'max-content' }}
                      className="p-2 mx-auto"
                    >
                      <QRCode
                        value={`${SITE_URL}/user/${detail?.id}?year=${searchParams.get('year')}`}
                      />
                    </div>
                    <div className="w-75 mx-auto mt-4">
                      <CFormLabel className="text-center">Напишите заголавок</CFormLabel>
                      <CFormInput
                        className=""
                        onChange={(e) => setQrTitle(e.target.value)}
                        placeholder="Заголовок для QR"
                      />
                    </div>
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>
          ) : (
            <Error403 detail={detail} />
          )}
        </>
      )}
    </>
  )
}

export default Show
