import {
  CButton,
  CHeader,
  CLoadingButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalTitle,
} from '@coreui/react-pro'
import React from 'react'
import { modalsStore } from '../../../store/index'

const ConfirmModal = ({ onConfirm, onClose, id, loading }) => {
  const { modals, closeModal } = modalsStore()
  return (
    <CModal
      visible={modals.confirm}
      onClose={() => {
        onClose()
        closeModal('confirm')
      }}
    >
      <CHeader>
        <CModalTitle>Tasdiqlash ( ID: {id} )</CModalTitle>
      </CHeader>
      <CModalBody>Siz rostdan ham o'chirmoqchimisiz?</CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => closeModal('confirm')}>
          Yopish
        </CButton>
        <CLoadingButton disabled={loading} loading={loading} color="primary" onClick={onConfirm}>
          O'chirish
        </CLoadingButton>
      </CModalFooter>
    </CModal>
  )
}

export default ConfirmModal
