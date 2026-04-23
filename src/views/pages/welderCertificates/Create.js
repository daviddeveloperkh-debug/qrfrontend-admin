import {
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CInputGroup,
  CRow,
} from '@coreui/react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { CDatePicker, CLoadingButton } from '@coreui/react-pro'
import { welderCertificatesStore } from '../../../store/index'
import { useNavigate } from 'react-router-dom'
import { format, parse } from 'date-fns'

const Create = () => {
  const navigate = useNavigate()
  const { create, createLoading } = welderCertificatesStore()
  const [params, setParams] = useState({})
  const [validated, setValidated] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setParams({ ...params, [name]: value })
  }
  const handleSelectChange = (name, value) => {
    setParams({ ...params, [name]: value })
  }
  const forms = [
    {
      label: 'Вводное заявление',
      children: (
        <CFormInput
          name="introStatement"
          value={params.introStatement}
          onChange={handleInputChange}
        />
      ),
    },
    {
      label: 'Теорическая оценка',
      children: (
        <CFormInput name="theoryGrade" value={params.theoryGrade} onChange={handleInputChange} />
      ),
    },
    {
      label: 'Практическая оценка',
      children: (
        <CFormInput
          name="practiceGrade"
          value={params.practiceGrade}
          onChange={handleInputChange}
        />
      ),
    },
    {
      label: 'Детали квалификации',
      children: (
        <CFormInput
          name="qualificationDetails"
          value={params.qualificationDetails}
          onChange={handleInputChange}
        />
      ),
    },
    {
      label: 'Основание для выдачи',
      children: (
        <CFormInput
          name="issuanceBasis"
          value={params.issuanceBasis}
          onChange={handleInputChange}
        />
      ),
    },
    {
      label: 'Орган выдачи',
      children: (
        <CFormInput name="issuingBody" value={params.issuingBody} onChange={handleInputChange} />
      ),
    },
    {
      label: 'Город',
      children: <CFormInput name="city" value={params.city} onChange={handleInputChange} />,
    },
    {
      label: 'Название сертификата',
      children: (
        <CFormInput
          name="certificatesName"
          value={params.certificatesName}
          onChange={handleInputChange}
        />
      ),
    },
    {
      label: 'Номер сертификата',
      children: (
        <CFormInput
          name="certificateNo"
          value={params.certificateNo}
          onChange={handleInputChange}
        />
      ),
    },
    {
      label: 'Дата выдачи',
      children: (
        <CDatePicker
          date={params.issueDate ? new Date(params.issueDate) : null}
          inputDateParse={(date) => parse(date, 'yyyy-MM-dd', new Date())}
          inputDateFormat={(date) => format(new Date(date), 'yyyy-MM-dd')}
          onDateChange={(date) => {
            if (date) {
              const formattedDate = format(new Date(date), 'yyyy-MM-dd')
              handleSelectChange('issueDate', formattedDate)
            } else {
              handleSelectChange('issueDate', '')
            }
          }}
          placeholder={'Выберите время'}
          locale="en-US"
        />
      ),
    },
    {
      label: 'Дата истечения',
      children: (
        <CDatePicker
          date={params.expiryDate ? new Date(params.expiryDate) : null}
          inputDateParse={(date) => parse(date, 'yyyy-MM-dd', new Date())}
          inputDateFormat={(date) => format(new Date(date), 'yyyy-MM-dd')}
          onDateChange={(date) => {
            if (date) {
              const formattedDate = format(new Date(date), 'yyyy-MM-dd')
              handleSelectChange('expiryDate', formattedDate)
            } else {
              handleSelectChange('expiryDate', '')
            }
          }}
          placeholder={'Выберите время'}
          locale="en-US"
        />
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
        } else if (value === undefined || value === null || value === '') {
          toast.error(`${msg.label} - Заполните`)
        }
      })
    } else {
      const data = { ...params }
      setValidated(true)
      create(data)
        .then((res) => {
          if (res?.success) {
            toast.success('Успешно создано')
            navigate('/welder-certificates')
            setValidated(false)
          } else {
            toast.error(res?.error?.message)
          }
        })
        .catch((err) => console.log('err', err))
    }
  }
  return (
    <CCard>
      <CCardBody>
        <CForm noValidate validated={validated} onSubmit={handleSubmit}>
          {forms?.map((item, idx) => (
            <CRow key={idx} className="mb-3">
              <CFormLabel className="col-sm-2 col-form-label">
                {item.label}{' '}
                {item.children.props.required && <span style={{ color: 'red' }}>*</span>}
              </CFormLabel>
              <CCol sm={10}>
                <CInputGroup>{item.children}</CInputGroup>
              </CCol>
            </CRow>
          ))}
          <CCardFooter className="text-end">
            <CLoadingButton
              color="primary"
              loading={createLoading}
              disabled={createLoading}
              type="submit"
            >
              Submit
            </CLoadingButton>
          </CCardFooter>
        </CForm>
      </CCardBody>
    </CCard>
  )
}

export default Create
