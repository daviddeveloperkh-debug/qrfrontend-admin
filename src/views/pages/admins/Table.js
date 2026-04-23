import { useEffect } from 'react'
import { CButton, CBadge, CFormInput } from '@coreui/react'
import { useState } from 'react'
import { cilLowVision, cilPen, cilQrCode, cilTrash } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import PageLoading from '../../../components/PageLoading/PageLoading'
import {
  addFilter,
  findValueAndSetToInput,
  findValueAndSetToSelect,
  roleList,
} from '../../../utils'
import { CSmartTable, CButtonGroup, CDatePicker } from '@coreui/react-pro'
import { adminsStore, modalsStore, userStore, welderCertificatesStore } from '../../../store/index'
import ConfirmModal from '../../notifications/modals/ConfirmModal'
import { useSearchParams } from 'react-router-dom'
import { NoItemsLabel, PaginationInfo } from '../../pagination/PaginationInfo'
import authStore from '../../../store/auth'
import Error403 from '../../base/forbidden/Error403'
import Select from '../../forms/select/Select'

const Table = ({ data }) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { getList, list, remove, deleteLoading, listLoading } = adminsStore()
  const { openModal } = modalsStore()
  const [visible, setVisible] = useState(false)
  const [imgId, setImgId] = useState()
  const { me } = authStore()
  const { closeModal } = modalsStore()
  const [idItem, setIdItem] = useState(null)
  const [params, setParams] = useState(() => {
    const all = Object.fromEntries([...searchParams.entries()])
    console.log(all)

    return {
      ...all,
      page: Number(all.page) || 1,
      limit: Number(all.limit) || 20,
    }
  })
  const updateSearchParams = (newParams) => {
    const current = Object.fromEntries([...searchParams.entries()])

    const merged = {
      ...current,
      ...newParams,
    }

    const clean = Object.fromEntries(
      Object.entries(merged).filter(([_, v]) => v !== undefined && v !== null && v !== ''),
    )

    setSearchParams(clean)
  }
  const handleSearch = () => {
    updateSearchParams({
      page: 1,
      ...params,
    })
  }
  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  useEffect(() => {
    const all = Object.fromEntries([...searchParams.entries()])
    const parsed = {
      ...all,
      page: Number(all.page) || 1,
      limit: Number(all.limit) || 20,
    }
    setParams(parsed)
    getList(parsed)
  }, [searchParams])
  console.log(params)
  const columns = [
    {
      key: 'id',
      label: 'ID',
      filter: () => {
        return (
          <CFormInput
            type="number"
            size="sm"
            onChange={(e) => addFilter(setParams, 'id', e.target.value)}
            onKeyPress={onKeyPress}
            onBlur={handleSearch}
            value={findValueAndSetToInput(params, 'id')}
          />
        )
      },
      sorter: true,
      _style: { width: '100px' },
    },
    {
      key: 'name',
      label: 'Имя',
      _style: { width: '250px' },
      filter: () => {
        return (
          <CFormInput
            size="sm"
            onChange={(e) => addFilter(setParams, 'name', e.target.value)}
            onKeyPress={onKeyPress}
            onBlur={handleSearch}
            value={findValueAndSetToInput(params, 'name')}
          />
        )
      },
      sorter: false,
    },
    {
      key: 'login',
      label: 'Логин',
      _style: { width: '250px' },
      filter: () => {
        return (
          <CFormInput
            size="sm"
            onChange={(e) => addFilter(setParams, 'login', e.target.value)}
            onKeyPress={onKeyPress}
            onBlur={handleSearch}
            value={findValueAndSetToInput(params, 'login')}
          />
        )
      },
      sorter: false,
    },
    {
      key: 'role',
      label: 'Роль',
      _style: { width: '110px' },
      filter: () => {
        return (
          <Select
            options={roleList?.map((item) => ({
              label: item?.label,
              value: item?.value,
            }))}
            size="sm"
            onChange={
              (e) => {
                updateSearchParams({
                  page: 1,
                  role: e?.value,
                })
              }
              // handleSelectChange(setParams, setSearchParams, params, 'role', e?.value)
            }
            value={findValueAndSetToSelect(params, roleList, 'role')}
          />
        )
      },
      sorter: false,
    },
    {
      key: 'show_details',
      label: 'Детали',
      _style: { width: '60px' },
      filter: false,
      sorter: false,
    },
  ]

  return !list?.error ? (
    <>
      <div>
        <CSmartTable
          columns={columns}
          items={list?.data || []}
          columnFilter
          columnSorter={{ resetable: true, multiple: false }}
          onSorterChange={(sorter) => {
            if (!sorter?.column || !sorter?.state) {
              updateSearchParams({ page: 1, sortBy: '', order: '' })
              return
            }
            updateSearchParams({
              page: 1,
              sortBy: sorter.column,
              order: sorter.state,
            })
          }}
          sorterValue={{
            column: params?.sortBy || '',
            state: params?.order || '',
          }}
          loading={listLoading}
          noItemsLabel={<NoItemsLabel />}
          tableProps={{
            hover: true,
            responsive: true,
          }}
          scopedColumns={{
            show_details: (item) => {
              return (
                <td>
                  <CButtonGroup size="sm" className="table-show-details">
                    <CButton
                      href={`#/admins/${item.id}`}
                      type="button"
                      color="info"
                      variant="outline"
                    >
                      <CIcon icon={cilLowVision} />
                    </CButton>
                    <CButton href={`#/admins/edit/${item.id}`} color="warning" variant="outline">
                      <CIcon icon={cilPen} />
                    </CButton>
                    <CButton
                      onClick={() => {
                        setIdItem(item.id)
                        openModal('confirm')
                      }}
                      color="danger"
                      variant="outline"
                    >
                      <CIcon icon={cilTrash} />
                    </CButton>
                  </CButtonGroup>
                </td>
              )
            },
          }}
          pagination
          paginationProps={{
            pages: list?.pagination?.totalPages,
            activePage: list?.pagination?.page,
            onActivePageChange: (activePage) => {
              setParams((prev) => ({
                ...prev,
                page: activePage,
              }))

              updateSearchParams({
                page: activePage,
              })
            },
            className: 'ms-2',
          }}
          onItemsPerPageChange={(items) => {
            setParams((prev) => ({
              ...prev,
              limit: items,
              page: 1,
            }))

            updateSearchParams({
              limit: items,
              page: 1,
            })
          }}
          itemsPerPage={params.limit}
          itemsNumber={list?.pagination?.total}
          itemsPerPageLabel={
            <PaginationInfo
              currentPage={list?.pagination?.page}
              limit={params.limit}
              totalRecords={list?.pagination?.total}
            />
          }
          itemsPerPageSelect
        />
      </div>
      <PageLoading loading={listLoading} />
      <ConfirmModal
        onConfirm={() =>
          remove(idItem).then(() => {
            closeModal('confirm')
            getList()
          })
        }
        onClose={() => setIdItem(null)}
        id={idItem}
        loading={deleteLoading}
      />
    </>
  ) : (
    <Error403 detail={list} />
  )
}

export default Table
