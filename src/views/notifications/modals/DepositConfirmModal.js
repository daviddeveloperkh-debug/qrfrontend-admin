import {
  CButton,
  CHeader,
  CLoadingButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalTitle,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { modalsStore, operatorDepositStore } from '../../../store/index'
import { CForm, CFormInput, CFormTextarea } from '@coreui/react'
import Select from '../../forms/select/Select'
import { findValueAndSetToSelect } from '../../../utils'
import { toast } from 'react-toastify'

const DepositConfirmModal = ({ onClose, item, loading }) => {
  const { modals, closeModal } = modalsStore()
  const [params, setParams] = useState({})
  const { statics, staticsLoading, depositConfirm } = operatorDepositStore()
  const handleChange = (key, value) => {
    setParams((prev) => ({ ...prev, [key]: value }))
  }
  const getValue = () => {
    const value = statics?.operatorStatusList?.find((f) => f.value === params?.status?.value)
    return {
      label: value?.label,
      value: value?.value,
    }
  }
  useEffect(() => {
    setParams({
      depositId: item?.id,
      status:
        item?.status?.int === -1 || item?.status?.int === 6
          ? { label: item?.status?.string, value: item?.status?.int }
          : null,
      comment: item?.comment,
    })
  }, [item])
  return (
    <CModal
      visible={modals.depositConfirm}
      onClose={() => {
        onClose()
        closeModal('depositConfirm')
      }}
    >
      <CHeader>
        <CModalTitle>Подтверждение депозита ( ID: {params?.depositId} )</CModalTitle>
      </CHeader>
      <CModalBody>
        <CForm>
          <CFormInput className="mb-2" value={params?.depositId} disabled readOnly label="Ид" />
          <Select
            options={statics?.operatorStatusList
              ?.filter((item) => item?.value === -1 || item?.value === 6)
              ?.map((item) => ({
                label: item?.label,
                value: item?.value,
              }))}
            size="sm"
            onChange={(e) => {
              handleChange('status', e)
              if (e?.value === 6) {
                handleChange('comment', 'Подтверждено')
              }
              if (e?.value === -1) {
                handleChange('comment', 'Отклонено')
              }
              if (!e?.value) {
                handleChange('comment', '')
              }
            }}
            loading={staticsLoading}
            className={'mb-2'}
            value={getValue()}
            label="Статус"
          />
          <CFormTextarea
            onChange={(e) => handleChange('comment', e.target.value)}
            value={params?.comment}
            cols={4}
            label="Подтвердить комментарий"
          />
        </CForm>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => closeModal('depositConfirm')}>
          Закрыть
        </CButton>
        <CLoadingButton
          disabled={loading}
          loading={loading}
          color="primary"
          onClick={() => {
            const data = { ...params }
            if (!data['comment']) {
              toast.error('Пожалуйста, введите комментарий')
              return
            } else {
              data['status'] = params?.status?.value
              depositConfirm(data).then((res) => {
                if (res?.success) {
                  closeModal('depositConfirm')
                  toast.success('Успешно изменен')
                  location.reload()
                }
              })
            }
          }}
        >
          Submit
        </CLoadingButton>
      </CModalFooter>
    </CModal>
  )
}

export default DepositConfirmModal
