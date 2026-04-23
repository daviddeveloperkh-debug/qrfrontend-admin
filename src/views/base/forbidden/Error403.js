import { cilWarning } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CAlert } from '@coreui/react-pro'

const Error403 = ({ detail }) => {
  return (
    <>
      <CAlert color="danger" className='m-5'>
        <CIcon icon={cilWarning} /> {detail?.error}
      </CAlert>
    </>
  )
}

export default Error403
