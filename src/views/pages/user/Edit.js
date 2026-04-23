import {
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCardTitle,
  CCol,
  CForm,
  CFormInput,
} from '@coreui/react'
import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { userStore, welderCertificatesStore } from '../../../store/index'
import { CButton, CDatePicker, CLoadingButton } from '@coreui/react-pro'
import { useParams } from 'react-router-dom'
import Select from '../../forms/select/Select'
import { useNavigate } from 'react-router-dom'
import { helperQuery } from '../../../_nav'
import Error403 from '../../base/forbidden/Error403'
import PageLoading from '../../../components/PageLoading/PageLoading'
import { format, parse } from 'date-fns'
import { APP_URL } from '../../../config'
import { useSearchParams } from 'react-router-dom'

const Edit = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const fileInputRef = useRef(null)
  const { detail, getDetail, detailLoading, edit, editLoading } = userStore()
  const [params, setParams] = useState({})
  const [validated, setValidated] = useState(false)
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setParams({ ...params, [name]: value })
  }
  const handleSelectChange = (name, value) => {
    setParams({ ...params, [name]: value })
  }
  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setParams((prev) => ({
        ...prev,
        file: e.target.files[0],
      }))
    }
  }
  const handleRemoveImage = () => {
    setParams((prev) => ({ ...prev, file: null }))
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  useEffect(() => {
    getDetail({ year: searchParams.get('year'), id })
  }, [searchParams])
  useEffect(() => {
    setParams(() => ({
      // welderCertificateId: {
      //   label: `${detail?.welderCertificate?.certificatesName} ID: ( ${detail?.welderCertificate?.id} )`,
      //   value: detail?.welderCertificate?.id,
      // },
      given: detail?.given,
      firstName: detail?.firstName,
      lastName: detail?.lastName,
      patronymic: detail?.patronymic,
      specialty: detail?.specialty,
      qualification: detail?.qualification,
      birthDate: detail?.birthDate,
      passportNumber: detail?.passportNumber,
      certificateNumber: detail?.certificateNumber,
      protocolNumber: detail?.protocolNumber,
      protocolRegistrationDate: detail?.protocolRegistrationDate,
      commissionChairman: detail?.commissionChairman,
      file: APP_URL + detail?.photo,
    }))
  }, [detail])
  console.log(params)

  // useEffect(() => {
  //   getWelderCertificatesStatics()
  // }, [])

  const forms = [
    // {
    //   children: (
    //     <Select
    //       options={welderCertificatesStatics?.map((item) => ({
    //         label: `${item?.name} ID: ( ${item?.id} )`,
    //         value: item?.id,
    //       }))}
    //       value={params?.welderCertificateId}
    //       onChange={(e) => handleSelectChange('welderCertificateId', e)}
    //       loading={welderCertificatesStaticsLoading}
    //       label="Сертификат"
    //     />
    //   ),
    // },
    {
      children: (
        <CFormInput
          name="given"
          value={params.given}
          onChange={handleInputChange}
          required
          label="Данный"
        />
      ),
    },
    {
      children: (
        <CFormInput
          name="firstName"
          value={params.firstName}
          onChange={handleInputChange}
          required
          label="Имя"
        />
      ),
    },
    {
      children: (
        <CFormInput
          name="lastName"
          value={params.lastName}
          onChange={handleInputChange}
          required
          label="Фамилия"
        />
      ),
    },
    {
      children: (
        <CFormInput
          name="patronymic"
          value={params.patronymic}
          onChange={handleInputChange}
          required
          label="Отчество"
        />
      ),
    },
    {
      children: (
        <CFormInput
          name="specialty"
          value={params.specialty}
          onChange={handleInputChange}
          required
          label="Специализация"
        />
      ),
    },
    {
      children: (
        <CFormInput
          name="qualification"
          value={params.qualification}
          onChange={handleInputChange}
          required
          label="Квалификация"
        />
      ),
    },
    {
      children: (
        <CDatePicker
          date={params.birthDate ? new Date(params.birthDate) : null}
          inputDateParse={(date) => parse(date, 'yyyy-MM-dd', new Date())}
          inputDateFormat={(date) => format(new Date(date), 'yyyy-MM-dd')}
          onDateChange={(date) => {
            if (date) {
              const formattedDate = format(new Date(date), 'yyyy-MM-dd')
              handleSelectChange('birthDate', formattedDate)
            } else {
              handleSelectChange('birthDate', '')
            }
          }}
          placeholder={'Выберите время'}
          locale="en-US"
          required
          label="Дата рождения"
        />
      ),
    },
    {
      children: (
        <CFormInput
          name="passportNumber"
          value={params.passportNumber}
          onChange={handleInputChange}
          required
          label="Номер паспорта"
        />
      ),
    },
    {
      children: (
        <CFormInput
          name="certificateNumber"
          value={params.certificateNumber}
          onChange={handleInputChange}
          required
          label="Номер сертификата"
        />
      ),
    },
    {
      children: (
        <CFormInput
          name="protocolNumber"
          value={params.protocolNumber}
          onChange={handleInputChange}
          required
          label="Номер протокола"
        />
      ),
    },
    {
      children: (
        <CDatePicker
          date={params.protocolRegistrationDate ? new Date(params.protocolRegistrationDate) : null}
          inputDateParse={(date) => parse(date, 'yyyy-MM-dd', new Date())}
          inputDateFormat={(date) => format(new Date(date), 'yyyy-MM-dd')}
          onDateChange={(date) => {
            if (date) {
              const formattedDate = format(new Date(date), 'yyyy-MM-dd')
              handleSelectChange('protocolRegistrationDate', formattedDate)
            } else {
              handleSelectChange('protocolRegistrationDate', '')
            }
          }}
          placeholder={'Выберите время'}
          locale="en-US"
          required
          label="Дата регистрации протокола"
        />
      ),
    },
    {
      children: (
        <CFormInput
          name="commissionChairman"
          value={params.commissionChairman}
          onChange={handleInputChange}
          required
          label="Председатель комиссии"
        />
      ),
    },
    {
      children: (
        <>
          <CFormInput
            ref={fileInputRef}
            type="file"
            onChange={(e) => handleFileChange(e, 'file')}
            label="Картинка"
          />
          <CButton color="danger" onClick={handleRemoveImage}>
            Удалить
          </CButton>
          {params?.file && (
            <div className="w-100">
              <img
                src={
                  typeof params.file === 'string' ? params.file : URL.createObjectURL(params.file)
                }
                alt="Uploaded"
                style={{ maxWidth: '100%', maxHeight: '500px' }}
              />
            </div>
          )}
        </>
      ),
    },
  ]
  const handleSubmit = (event) => {
    event.preventDefault()
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
      const requiredFilters = forms.filter((item) => item.children.props.required)
      requiredFilters.map((msg) => {
        const value = msg.children.props.value
        if (msg.children.props.options?.length > 0) {
          if (value?.value === undefined || value?.value === null || value?.value === '') {
            toast.error(`${msg.label} - Заполните`)
          }
        } else {
          if (value === undefined || value === null || value === '') {
            toast.error(`${msg.label} - Заполните`)
          }
        }
      })
    } else {
      const data = { ...params }
      data['id'] = id
      // data['welderCertificateId'] = params.welderCertificateId?.value || null
      edit(id, searchParams.get('year'), data)
        .then((res) => {
          if (res?.success) {
            toast.success('Успешно изменен')
            navigate('/user' + helperQuery)
          } else {
            toast.error(res?.error?.message)
          }
        })
        .catch((err) => console.log('err', err))
    }
    setValidated(true)
  }

  return detailLoading ? (
    <PageLoading loading={true} />
  ) : detail?.id ? (
    <CCard>
      <CCardHeader>
        <CCardTitle className="mb">
          {detail?.name} ( ID: {detail?.id} )
        </CCardTitle>
      </CCardHeader>
      <CCardBody>
        <CForm noValidate validated={validated} onSubmit={handleSubmit} className="row g-3">
          {forms?.map((item, idx) => (
            <CCol sm={6} key={idx}>
              {React.cloneElement(item.children, {
                label: (
                  <>
                    {item.children.props.label}{' '}
                    {item.children.props.required && <span style={{ color: 'red' }}>*</span>}
                  </>
                ),
              })}
            </CCol>
          ))}
          <CCardFooter className="text-end">
            <CLoadingButton
              color="primary"
              loading={editLoading}
              disabled={editLoading}
              type="submit"
            >
              Изменить
            </CLoadingButton>
          </CCardFooter>
        </CForm>
      </CCardBody>
    </CCard>
  ) : (
    <Error403 detail={detail} />
  )
}

export default Edit
