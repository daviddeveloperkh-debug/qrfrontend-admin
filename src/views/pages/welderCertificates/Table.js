import { useEffect } from 'react'
import { CButton, CBadge, CFormInput } from '@coreui/react'
import { useState } from 'react'
import { cilLowVision, cilPen, cilTrash } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import PageLoading from '../../../components/PageLoading/PageLoading'
import { addFilter, findValueAndSetToInput, handlePagination } from '../../../utils'
import { CSmartTable, CButtonGroup } from '@coreui/react-pro'
import { modalsStore, welderCertificatesStore } from '../../../store/index'
import ConfirmModal from '../../notifications/modals/ConfirmModal'
import { useSearchParams } from 'react-router-dom'
import Select from '../../forms/select/Select'
import DatePicker from '../../forms/datePicker/DatePicker'
import { NoItemsLabel, PaginationInfo } from '../../pagination/PaginationInfo'
// bank

const Table = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { getList, list, remove, deleteLoading, listLoading, getStatics, statics, staticsLoading } =
    welderCertificatesStore()
  const { openModal, closeModal } = modalsStore()
  const [idItem, setIdItem] = useState(null)
  const [params, setParams] = useState({
    page: searchParams.get('page'),
    limit: searchParams.get('limit'),
    sort: searchParams.get('sort') ? JSON.parse(searchParams.get('sort')) : {},
    filters: searchParams.get('filters') ? JSON.parse(searchParams.get('filters')) : [],
  })
  const handleSearch = () => {
    const query = {
      page: 1,
      limit: params.limit,
      sort: JSON.stringify(params.sort),
      filters: JSON.stringify(params.filters),
    }

    setSearchParams(query)
  }
  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }
  useEffect(() => {
    getStatics()
  }, [])
  useEffect(() => {
    const page = searchParams.get('page') || 1
    const limit = searchParams.get('limit') || 20
    const sort = searchParams.get('sort') ? JSON.parse(searchParams.get('sort')) : {}
    const filters = searchParams.get('filters') ? JSON.parse(searchParams.get('filters')) : []

    setParams({ page, limit, sort, filters })
    const data = { ...params }
    data['page'] = page
    data['limit'] = limit
    data['sort'] = sort
    data['filters'] = filters
    getList(data)
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
      _style: { width: '60px' },
    },
    {
      key: 'certificatesName',
      label: 'Сертификат',
      filter: () => {
        return (
          <CFormInput
            size="sm"
            onChange={(e) => addFilter(setParams, 'certificatesName', e.target.value)}
            onKeyPress={onKeyPress}
            onBlur={handleSearch}
            value={findValueAndSetToInput(params, 'certificatesName')}
          />
        )
      },
      sorter: false,
      _style: { width: '100px' },
    },
    {
      key: 'certificateNo',
      label: 'Номер сертификат',
      filter: () => {
        return (
          <CFormInput
            size="sm"
            onChange={(e) => addFilter(setParams, 'certificateNo', e.target.value)}
            onKeyPress={onKeyPress}
            onBlur={handleSearch}
            value={findValueAndSetToInput(params, 'certificateNo')}
          />
        )
      },
      sorter: false,
      _style: { width: '100px' },
    },
    {
      key: 'city',
      label: 'Город',
      filter: () => {
        return (
          <CFormInput
            size="sm"
            onChange={(e) => addFilter(setParams, 'city', e.target.value)}
            onKeyPress={onKeyPress}
            onBlur={handleSearch}
            value={findValueAndSetToInput(params, 'city')}
          />
        )
      },
      sorter: false,
      _style: { width: '100px' },
    },
    {
      key: 'issueDate',
      label: 'Дата выдачи',
      filter: () => {
        return (
          <CFormInput
            size="sm"
            onChange={(e) => addFilter(setParams, 'issueDate', e.target.value)}
            onKeyPress={onKeyPress}
            onBlur={handleSearch}
            value={findValueAndSetToInput(params, 'issueDate')}
          />
        )
      },
      sorter: false,
      _style: { width: '100px' },
    },
    {
      key: 'expiryDate',
      label: 'Дата истечения',
      filter: () => {
        return (
          <CFormInput
            size="sm"
            onChange={(e) => addFilter(setParams, 'expiryDate', e.target.value)}
            onKeyPress={onKeyPress}
            onBlur={handleSearch}
            value={findValueAndSetToInput(params, 'expiryDate')}
          />
        )
      },
      sorter: false,
      _style: { width: '100px' },
    },
    {
      key: 'issuingBody',
      label: 'Орган выдающий',
      filter: () => {
        return (
          <CFormInput
            size="sm"
            onChange={(e) => addFilter(setParams, 'issuingBody', e.target.value)}
            onKeyPress={onKeyPress}
            onBlur={handleSearch}
            value={findValueAndSetToInput(params, 'issuingBody')}
          />
        )
      },
      sorter: false,
      _style: { width: '100px' },
    },
    {
      key: 'practiceGrade',
      label: 'Практическая оценка',
      filter: () => {
        return (
          <CFormInput
            size="sm"
            onChange={(e) => addFilter(setParams, 'practiceGrade', e.target.value)}
            onKeyPress={onKeyPress}
            onBlur={handleSearch}
            value={findValueAndSetToInput(params, 'practiceGrade')}
          />
        )
      },
      sorter: false,
      _style: { width: '100px' },
    },
    {
      key: 'theoryGrade',
      label: 'Теоретическая оценка',
      filter: () => {
        return (
          <CFormInput
            size="sm"
            onChange={(e) => addFilter(setParams, 'theoryGrade', e.target.value)}
            onKeyPress={onKeyPress}
            onBlur={handleSearch}
            value={findValueAndSetToInput(params, 'theoryGrade')}
          />
        )
      },
      sorter: false,
      _style: { width: '100px' },
    },
    // {
    //   key: 'logo',
    //   label: 'Лого',
    //   filter: false,
    //   sorter: false,
    //   _style: { width: '80px' },
    // },
    // {
    //   key: 'status',
    //   label: 'Status',
    //   _style: { width: '100px' },
    //   filter: () => {
    //     return (
    //       <Select
    //         options={statics?.statusList?.map((item) => ({
    //           label: item?.label,
    //           value: item?.value,
    //         }))}
    //         size="sm"
    //         onChange={(e) =>
    //           handleSelectChange(setParams, setSearchParams, params, 'status', e?.value)
    //         }
    //         loading={staticsLoading}
    //         value={findValueAndSetToSelect(params, statics?.statusList, 'status')}
    //       />
    //     )
    //   },
    //   sorter: false,
    // },
    {
      key: 'createdAt',
      label: 'Время',
      _style: { width: '200px' },
      filter: () => {
        return (
          <DatePicker
            params={params}
            setParams={setParams}
            handleSearch={() => {
              handleSearch()
            }}
            column={'createdAt'}
            onClear={() => {
              const updatedFilters = params.filters?.filter((f) => f.column !== 'createdAt')
              const query = {
                page: 1,
                limit: params.limit,
                sort: JSON.stringify(params.sort),
                filters: JSON.stringify(updatedFilters),
              }
              setSearchParams(query)
            }}
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
  return (
    <>
      <div>
        <CSmartTable
          columns={columns}
          items={list?.data || []}
          columnFilter
          columnSorter={{ resetable: true, multiple: false }}
          onSorterChange={(column) => {
            const updateSort = column?.state ? { column: column?.column, value: column?.state } : {}
            const query = {
              page: 1,
              limit: params.limit,
              sort: JSON.stringify(updateSort),
              filters: JSON.stringify(params.filters),
            }
            setSearchParams(query)
          }}
          sorterValue={{ column: params?.sort?.column, state: params?.sort?.value }}
          loading={listLoading}
          noItemsLabel={<NoItemsLabel />}
          tableProps={{
            hover: true,
            responsive: true,
          }}
          scopedColumns={{
            logo: (item) => (
              <td>
                <img src={item?.logo} width={70} height={70} alt="" />
              </td>
            ),
            createdAt: (item) => <td>{item?.createdAt}</td>,
            show_details: (item) => {
              return (
                <td>
                  <CButtonGroup size="sm" className="table-show-details">
                    <CButton
                      href={`#/welder-certificates/${item.id}`}
                      type="button"
                      color="info"
                      variant="outline"
                    >
                      <CIcon icon={cilLowVision} />
                    </CButton>
                    <CButton
                      href={`#/welder-certificates/edit/${item.id}`}
                      color="warning"
                      variant="outline"
                    >
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
              handlePagination(setParams, 'page', activePage)
              const query = {
                page: activePage,
                limit: params.limit,
                sort: JSON.stringify(params.sort),
                filters: JSON.stringify(params.filters),
              }
              setSearchParams(query)
            },
            className: 'ms-2',
          }}
          onItemsPerPageChange={(items) => {
            const query = {
              page: params.page,
              limit: items,
              sort: JSON.stringify(params.sort),
              filters: JSON.stringify(params.filters),
            }
            setSearchParams(query)
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
          remove(idItem).then((res) => {
            closeModal('confirm')
            getList()
          })
        }
        onClose={() => setIdItem(null)}
        id={idItem}
        loading={deleteLoading}
      />
    </>
  )
}

export default Table
