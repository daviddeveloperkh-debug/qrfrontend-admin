import { useEffect } from 'react'
import { CButton, CBadge, CFormInput } from '@coreui/react'
import { useState } from 'react'
import { cilLowVision, cilPen, cilQrCode, cilTrash } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import PageLoading from '../../../components/PageLoading/PageLoading'
import { addFilter, findValueAndSetToInput } from '../../../utils'
import { CSmartTable, CButtonGroup, CDatePicker } from '@coreui/react-pro'
import { modalsStore, userStore, welderCertificatesStore } from '../../../store/index'
import ConfirmModal from '../../notifications/modals/ConfirmModal'
import { useSearchParams } from 'react-router-dom'
import { NoItemsLabel, PaginationInfo } from '../../pagination/PaginationInfo'
import authStore from '../../../store/auth'
import Error403 from '../../base/forbidden/Error403'
import DatePicker from '../../forms/datePicker/DatePicker'
import { APP_URL } from '../../../config'
import Viewer from 'react-viewer'

const Table = ({ data }) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { getList, list, remove, deleteLoading, listLoading } = userStore()
  const {
    getStatics: getWelderCertificatesStatics,
    statics: welderCertificatesStatics,
    staticsLoading: welderCertificatesStaticsLoading,
  } = welderCertificatesStore()
  const { openModal } = modalsStore()
  const [visible, setVisible] = useState(false)
  const [imgId, setImgId] = useState()
  const { me } = authStore()
  const { closeModal } = modalsStore()
  const [currentItem, setCurrentItem] = useState({})
  const [params, setParams] = useState(() => {
    const all = Object.fromEntries([...searchParams.entries()])
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
  // useEffect(() => {
  //   getWelderCertificatesStatics()
  // }, [])
  console.log(params)
  const columns = [
    // {
    //   key: 'id',
    //   label: 'ID',
    //   filter: () => {
    //     return (
    //       <CFormInput
    //         size="sm"
    //         onChange={(e) => addFilter(setParams, 'id', e.target.value)}
    //         onKeyPress={onKeyPress}
    //         onBlur={handleSearch}
    //         value={findValueAndSetToInput(params, 'id')}
    //       />
    //     )
    //   },
    //   sorter: true,
    //   _style: { width: '100px' },
    // },
    {
      key: 'firstName',
      label: 'Имя',
      _style: { width: '150px' },
      filter: () => {
        return (
          <CFormInput
            size="sm"
            onChange={(e) => addFilter(setParams, 'firstName', e.target.value)}
            onKeyPress={onKeyPress}
            onBlur={handleSearch}
            value={findValueAndSetToInput(params, 'firstName')}
          />
        )
      },
      sorter: false,
    },
    {
      key: 'lastName',
      label: 'Фамилия',
      _style: { width: '150px' },
      filter: () => {
        return (
          <CFormInput
            size="sm"
            onChange={(e) => addFilter(setParams, 'lastName', e.target.value)}
            onKeyPress={onKeyPress}
            onBlur={handleSearch}
            value={findValueAndSetToInput(params, 'lastName')}
          />
        )
      },
      sorter: false,
    },
    {
      key: 'patronymic',
      label: 'Отчество',
      _style: { width: '150px' },
      filter: () => {
        return (
          <CFormInput
            size="sm"
            onChange={(e) => addFilter(setParams, 'patronymic', e.target.value)}
            onKeyPress={onKeyPress}
            onBlur={handleSearch}
            value={findValueAndSetToInput(params, 'patronymic')}
          />
        )
      },
      sorter: false,
    },
    {
      key: 'given',
      label: 'Данный',
      _style: { width: '250px' },
      filter: () => {
        return (
          <CFormInput
            size="sm"
            onChange={(e) => addFilter(setParams, 'given', e.target.value)}
            onKeyPress={onKeyPress}
            onBlur={handleSearch}
            value={findValueAndSetToInput(params, 'given')}
          />
        )
      },
      sorter: false,
    },
    // {
    //   key: 'welderCertificateId',
    //   label: 'Сертификат',
    //   _style: { width: '100px' },
    //   filter: () => {
    //     return (
    //       <Select
    //         options={welderCertificatesStatics?.map((item) => ({
    //           label: `${item?.name} ID: ( ${item?.id} )`,
    //           value: item?.id,
    //         }))}
    //         size="sm"
    //         onChange={(e) =>
    //           handleSelectChange(
    //             setParams,
    //             setSearchParams,
    //             params,
    //             'welderCertificateId',
    //             e?.value,
    //           )
    //         }
    //         loading={welderCertificatesStaticsLoading}
    //         value={findIdAndSetToSelect(params, welderCertificatesStatics, 'welderCertificateId')}
    //       />
    //     )
    //   },
    //   sorter: false,
    // },
    {
      key: 'passportNumber',
      label: 'Паспорт',
      _style: { width: '110px' },
      filter: () => {
        return (
          <CFormInput
            size="sm"
            onChange={(e) => addFilter(setParams, 'passportNumber', e.target.value)}
            onKeyPress={onKeyPress}
            onBlur={handleSearch}
            value={findValueAndSetToInput(params, 'passportNumber')}
          />
        )
      },
      sorter: false,
    },
    {
      key: 'certificateNumber',
      label: 'Номер сертификата',
      _style: { width: '110px' },
      filter: () => {
        return (
          <CFormInput
            size="sm"
            onChange={(e) => addFilter(setParams, 'certificateNumber', e.target.value)}
            onKeyPress={onKeyPress}
            onBlur={handleSearch}
            value={findValueAndSetToInput(params, 'certificateNumber')}
          />
        )
      },
      sorter: false,
    },
    {
      key: 'qualification',
      label: 'Квалификация',
      _style: { width: '110px' },
      filter: () => {
        return (
          <CFormInput
            size="sm"
            onChange={(e) => addFilter(setParams, 'qualification', e.target.value)}
            onKeyPress={onKeyPress}
            onBlur={handleSearch}
            value={findValueAndSetToInput(params, 'qualification')}
          />
        )
      },
      sorter: false,
    },
    {
      key: 'specialty',
      label: 'Специализация',
      _style: { width: '110px' },
      filter: () => {
        return (
          <CFormInput
            size="sm"
            onChange={(e) => addFilter(setParams, 'specialty', e.target.value)}
            onKeyPress={onKeyPress}
            onBlur={handleSearch}
            value={findValueAndSetToInput(params, 'specialty')}
          />
        )
      },
      sorter: false,
    },
    {
      key: 'protocolNumber',
      label: 'Номер протокола',
      _style: { width: '110px' },
      filter: () => {
        return (
          <CFormInput
            size="sm"
            onChange={(e) => addFilter(setParams, 'protocolNumber', e.target.value)}
            onKeyPress={onKeyPress}
            onBlur={handleSearch}
            value={findValueAndSetToInput(params, 'protocolNumber')}
          />
        )
      },
      sorter: false,
    },
    {
      key: 'protocolRegistrationDate',
      label: 'Дата регистрации протокола',
      _style: { width: '110px' },
      filter: () => {
        return (
          <CFormInput
            size="sm"
            onChange={(e) => addFilter(setParams, 'protocolRegistrationDate', e.target.value)}
            onKeyPress={onKeyPress}
            onBlur={handleSearch}
            value={findValueAndSetToInput(params, 'protocolRegistrationDate')}
          />
        )
      },
      sorter: false,
    },
    {
      key: 'commissionChairman',
      label: 'Председатель комиссии',
      _style: { width: '110px' },
      filter: () => {
        return (
          <CFormInput
            size="sm"
            onChange={(e) => addFilter(setParams, 'commissionChairman', e.target.value)}
            onKeyPress={onKeyPress}
            onBlur={handleSearch}
            value={findValueAndSetToInput(params, 'commissionChairman')}
          />
        )
      },
      sorter: false,
    },
    {
      key: 'year',
      label: 'Год',
      _style: { width: '110px' },
      filter: () => {
        return (
          <CFormInput
            size="sm"
            onChange={(e) => addFilter(setParams, 'year', e.target.value)}
            onKeyPress={onKeyPress}
            onBlur={handleSearch}
            value={findValueAndSetToInput(params, 'year')}
          />
        )
      },
      sorter: false,
    },
    {
      key: 'birthDate',
      label: 'Дата рождения',
      _style: { width: '200px' },
      filter: () => {
        return (
          <DatePicker
            params={params}
            setParams={setParams}
            updateSearchParams={updateSearchParams}
            column={'birthDate'}
          />
        )
      },
      sorter: false,
    },
    {
      key: 'createdAt',
      label: 'Время',
      _style: { width: '200px' },
      filter: () => {
        return (
          <DatePicker
            params={params}
            setParams={setParams}
            column={'createdAt'}
            updateSearchParams={updateSearchParams}
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
            firstName: (item) => (
              <td>
                <div className="d-flex align-items-center gap-2">
                  {/* <CAvatar
                    style={{ minWidth: '40px', width: '40px' }}
                    status={userStatusMap[item?.status?.int]}
                    size="md"
                    src={IMAGES.user}
                  />{' '} */}
                  <img
                    src={APP_URL + item.photo}
                    onClick={() => {
                      setImgId(item.id)
                      setVisible(true)
                    }}
                    style={{
                      minWidth: '40px',
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                    }}
                    alt=""
                  />
                  {item.id === imgId && (
                    <Viewer
                      visible={visible}
                      onClose={() => {
                        setVisible(false)
                        setImgId()
                      }}
                      images={[{ src: APP_URL + item?.photo, alt: '' }]}
                      onMaskClick={() => setVisible(false)}
                    />
                  )}
                  <div style={{ color: '#635BFF', fontWeight: '500' }}>{item.firstName}</div>
                </div>
              </td>
            ),
            passportNumber: (item) => (
              <td>
                <div className="passport">
                  {item.passportNumber?.slice(0, 2)} | {item?.passportNumber?.slice(2, 10)}
                </div>
              </td>
            ),
            // welderCertificateId: (item) => (
            //   <td>
            //     {welderCertificatesStatics?.find((w) => w.id === item.welderCertificateId)?.name} ({' '}
            //     {item.welderCertificateId} )
            //   </td>
            // ),
            show_details: (item) => {
              return (
                <td>
                  <CButtonGroup size="sm" className="table-show-details">
                    {/* <CButton
                      href={`#/user/${item.id}`}
                      type="button"
                      color="light"
                      variant="outline"
                    >
                      <CIcon icon={cilQrCode} />
                    </CButton> */}
                    <CButton
                      href={`#/user/${item.id}?year=${item.year}`}
                      type="button"
                      color="info"
                      variant="outline"
                    >
                      <CIcon icon={cilLowVision} />
                    </CButton>
                    <CButton
                      href={`#/user/edit/${item.id}?year=${item.year}`}
                      color="warning"
                      variant="outline"
                    >
                      <CIcon icon={cilPen} />
                    </CButton>
                    <CButton
                      onClick={() => {
                        setCurrentItem(item)
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
          remove(currentItem.id, { year: currentItem.year }).then(() => {
            closeModal('confirm')
            getList()
          })
        }
        onClose={() => setCurrentItem({})}
        id={currentItem.id}
        loading={deleteLoading}
      />
    </>
  ) : (
    <Error403 detail={list} />
  )
}

export default Table
