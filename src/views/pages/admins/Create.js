import { CButton, CCard, CCardBody, CCardFooter, CCol, CForm, CFormInput } from '@coreui/react'
import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { CDatePicker, CLoadingButton } from '@coreui/react-pro'
import { adminsStore, userStore, welderCertificatesStore } from '../../../store/index'
import Select from '../../forms/select/Select'
import { useNavigate } from 'react-router-dom'
import { helperQuery } from '../../../_nav'
import { format, parse } from 'date-fns'
import { copyText, roleList } from '../../../utils'
import CIcon from '@coreui/icons-react'
import { cilCopy } from '@coreui/icons'

const Create = () => {
  const navigate = useNavigate()
  const fileInputRef = useRef(null)
  const { create, createLoading } = adminsStore()
  const [params, setParams] = useState({})
  const [validated, setValidated] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setParams({ ...params, [name]: value })
  }
  const handleSelectChange = (name, value) => {
    setParams({ ...params, [name]: value })
  }
  const [password, setPassword] = useState('')
  const generatePassword = () => {
    const length = 10
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHJKLMNOPQRSTUVWXYZ123456789'
    const password = Array.from(
      { length },
      () => charset[Math.floor(Math.random() * charset.length)],
    ).join('')
    setPassword(password)
    handleSelectChange('password', password)
  }

  const forms = [
    {
      children: (
        <CFormInput
          name="name"
          value={params.name}
          onChange={handleInputChange}
          required
          label="Имя"
        />
      ),
    },
    {
      children: (
        <Select
          options={roleList?.map((item) => ({
            label: item?.label,
            value: item?.value,
          }))}
          value={params?.role}
          onChange={(e) => handleSelectChange('role', e)}
          label="Роль"
          required
        />
      ),
    },
    {
      children: (
        <CFormInput
          name="login"
          value={params.login}
          onChange={handleInputChange}
          required
          label="Логин"
        />
      ),
    },
    {
      label: 'Пароль',
      children: (
        <div className="position-relative">
          <CFormInput
            name="password"
            value={params.password}
            onChange={handleInputChange}
            style={{ width: '65%' }}
            label="Пароль"
          />
          <div
            className="d-flex align-items-center gap-3 mt-2"
            style={{ position: 'absolute', bottom: '0', right: '0' }}
          >
            <CButton color="primary" onClick={() => copyText(params?.password)}>
              <CIcon icon={cilCopy} title="Скопировать" />
            </CButton>
            <CButton color="primary" onClick={generatePassword}>
              Создать пароль
            </CButton>
          </div>
        </div>
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
            toast.error(`${label} - Заполните`)
          }
        } else if (value === undefined || value === null || value === '') {
          toast.error(`${label} - Заполните`)
        }
      })
    } else {
      const data = { ...params }
      data['role'] = params.role?.value || null
      setValidated(true)
      create(data)
        .then((res) => {
          toast.success('Успешно создано')
          navigate('/admins' + helperQuery)
          setValidated(false)
        })
        .catch((err) => console.log('err', err))
    }
  }
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
              Создать
            </CLoadingButton>
          </CCardFooter>
        </CForm>
      </CCardBody>
    </CCard>
  )
}

export default Create
