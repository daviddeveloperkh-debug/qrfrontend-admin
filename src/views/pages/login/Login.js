import { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import authStore from '../../../store/auth'
import { setToken } from '../../../helpers/api'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { CloseEyeIcon, EyeIcon } from '../../icons/icons'
// login
const Login = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const { postLogin, loginLoading } = authStore()
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const handleSubmit = () => {
    postLogin({ login, password })
      .then((res) => {
        if (res?.token) {
          navigate('/user')
          setToken(res?.token)
          toast.success('Успешно')
        }
        // if (res?.success) {
        //   if (!permissionRoles.includes(res?.data?.role)) {
        //     toast.error('Вы не можете войти!')
        //   } else {
        //     setToken(res?.data?.token)
        //     navigate('/user')
        //     toast.success('Успешно')
        //   }
        // }
        // if (!res?.success) {
        //   toast.error(res?.response?.data?.error?.message)
        // }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message)
      })
  }
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        handleSubmit()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [login, password])
  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Авторизация</h1>
                    <p className="text-body-secondary">Войдите в аккаунт</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Логин"
                        autoComplete="login"
                        onChange={(e) => setLogin(e.target.value)}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Пароль"
                        autoComplete="password"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <CButton
                        shape="rounded"
                        style={{
                          position: 'absolute',
                          top: '50%',
                          right: '0',
                          transform: 'translateY(-50%)',
                          zIndex: '6',
                        }}
                        onClick={() => setShowPassword((value) => !value)}
                      >
                        {showPassword ? <EyeIcon /> : <CloseEyeIcon />}
                      </CButton>
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton
                          onClick={handleSubmit}
                          disabled={loginLoading}
                          color="primary"
                          className="px-4"
                        >
                          Вход
                        </CButton>
                      </CCol>
                      {/* <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol> */}
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="bg-primary media-hide text-white py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center d-flex flex-column justify-content-center gap-3">
                  <h2>Админ панел</h2>
                  <p>
                    Добро пожаловать в админ панель! Войдите, чтобы управлять пользователями,
                    просматривать статистику и многое другое.
                  </p>
                  {/* <img src={IMAGES.login} style={{ margin: 'auto' }} alt="" /> */}
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
