import { CButton, CCard, CCardBody, CCardFooter, CCol, CForm, CFormInput } from '@coreui/react'
import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { CDatePicker, CLoadingButton } from '@coreui/react-pro'
import { userStore, welderCertificatesStore } from '../../../store/index'
import Select from '../../forms/select/Select'
import { useNavigate } from 'react-router-dom'
import { helperQuery } from '../../../_nav'
import { format, parse } from 'date-fns'

const Create = () => {
  const navigate = useNavigate()
  const fileInputRef = useRef(null)
  const { create, createLoading } = userStore()
  const {
    getStatics: getWelderCertificatesStatics,
    statics: welderCertificatesStatics,
    staticsLoading: welderCertificatesStaticsLoading,
  } = welderCertificatesStore()
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
          label="Berildi (tashkilot nomi: SANOAT XAVFSIZLIGI DQ)"
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
          label="Ismi"
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
          label="Familiya"
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
          label="Otasining ismi"
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
          label="Mutaxassisligi"
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
          label="Malakasi (masalan: ATT. 4-razryad)"
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
          placeholder={'Vaqtni tanlang'}
          locale="en-US"
          required
          label="Tug'ilgan sana"
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
          label="Pasport raqami"
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
          label="Guvohnoma raqami (faqat raqam kiriting)"
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
          label="Bayonnoma raqami"
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
          placeholder={'Vaqtni tanlang'}
          locale="en-US"
          required
          label="Bayonnoma roʻyxatdan oʻtgan sana"
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
          label="Komissiya raisi"
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
            label="Rasm"
          />
          <CButton color="danger" onClick={handleRemoveImage}>
            O'chirish
          </CButton>
          {params?.file && (
            <div className="w-100 mt-2">
              <img
                src={URL.createObjectURL(params.file)}
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
        const label = msg.children.props.label
        if (msg.children.props.options?.length > 0) {
          if (value?.value === undefined || value?.value === null || value?.value === '') {
            toast.error(`${label} - To\'ldiring`)
          }
        } else if (value === undefined || value === null || value === '') {
          toast.error(`${label} - To\'ldiring`)
        }
      })
    } else {
      const data = { ...params }
      // data['welderCertificateId'] = params.welderCertificateId?.value || null
      setValidated(true)
      create(data)
        .then((res) => {
          if (res?.success) {
            toast.success("Muvaffaqiyatli yaratildi")
            navigate('/user' + helperQuery)
            setValidated(false)
          } else {
            toast.error(res?.error?.message)
          }
        })
        .catch((err) => console.log('err', err))
    }
  }
  // useEffect(() => {
  //   getWelderCertificatesStatics()
  // }, [])
  return (
    <CCard>
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
              loading={createLoading}
              disabled={createLoading}
              type="submit"
            >
              Yaratish
            </CLoadingButton>
          </CCardFooter>
        </CForm>
      </CCardBody>
    </CCard>
  )
}

export default Create
