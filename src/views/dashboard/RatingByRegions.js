import { CCardTitle, CSmartTable } from '@coreui/react-pro'
import React, { useEffect } from 'react'
import { userStore } from '../../store/index'
import { NoItemsLabel } from '../pagination/PaginationInfo'
import { numberFormat } from '../../utils'

const RatingByRegions = () => {
  const { list, listLoading, getList } = userStore()
  const columns = [
    {
      key: 'fullName',
      label: "To'liq ismi",
      _style: { width: '130px' },
    },
    {
      key: 'passportNumber',
      label: 'Passport raqami',
      _style: { width: '60px' },
    },
    {
      key: 'qualification',
      label: 'Malakasi',
      _style: { width: '60px' },
    },
    {
      key: 'protocolNumber',
      label: 'Bayonnoma raqami',
      _style: { width: '60px' },
    },
    {
      key: 'createdAt',
      label: 'Yaratilgan vaqt',
      _style: { width: '60px' },
    },
  ]
  useEffect(() => {
    getList()
  }, [])
  return (
    <div>
      <CCardTitle className="mb-2">Oxirgi qo'shilgan studentlar</CCardTitle>
      <CSmartTable
        columns={columns}
        items={list?.data || []}
        columnFilter={false}
        loading={listLoading}
        noItemsLabel={<NoItemsLabel />}
        tableProps={{
          hover: true,
          responsive: true,
        }}
        scopedColumns={{
          fullName: (item) => (
            <td>
              {item?.firstName} {item?.lastName} {item?.patronymic}
            </td>
          ),
          created_at: (item) => <td>{item?.created_at?.date}</td>,
        }}
        pagination={false}
      />
    </div>
  )
}

export default RatingByRegions
