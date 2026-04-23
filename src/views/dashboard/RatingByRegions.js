import { CCardTitle, CSmartTable } from '@coreui/react-pro'
import React, { useEffect } from 'react'
import { transactionStore } from '../../store/index'
import { NoItemsLabel } from '../pagination/PaginationInfo'
import { numberFormat } from '../../utils'

const RatingByRegions = () => {
  const { list, listLoading, getList } = transactionStore()
  const columns = [
    {
      key: 'id',
      label: 'ИД',
      _style: { width: '60px' },
    },
    {
      key: 'user_id',
      label: 'Пользователь',
      _style: { width: '130px' },
    },
    {
      key: 'region_id',
      label: 'Регион',
      _style: { width: '60px' },
    },
    {
      key: 'amount',
      label: 'Сумма',
      _style: { width: '60px' },
    },
  ]
  useEffect(() => {
    getList()
  }, [])
  return (
    <div>
      <CCardTitle className='mb-2'>Последные транзакции</CCardTitle>
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
          status: (item) => (
            <td>
              <CBadge color={findStatusColorFromNumber(item?.status?.int)}>
                {item.status?.string}
              </CBadge>
            </td>
          ),
          logo: (item) => (
            <td>
              <img src={item?.logo} width={70} height={70} alt="" />
            </td>
          ),
          user_id: (item) => <td>{item?.user_id?.data?.login}</td>,
          amount: (item) => <td>{numberFormat(item?.amount)}</td>,
          region_id: (item) => <td>{item?.region_id?.data?.name}</td>,
          created_at: (item) => <td>{item?.created_at?.date}</td>,
        }}
        pagination={false}
      />
    </div>
  )
}

export default RatingByRegions
