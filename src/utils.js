import { toast } from 'react-toastify'

export const numberWithSpaces = (number) => {
  return Number(number).toLocaleString('ru-RU')
}

export const findCategory = (categories, id, setCategory) => {
  categories?.find((item) => {
    const current = item?.id === id
    if (current) {
      setCategory(item)
      console.log('current', current)
    } else {
      const subCategory = item?.subcategories?.find((sub) => sub?.id === id)
      setCategory(item)
      console.log('subCategory', subCategory)
    }
  })
}

export const isHas = (items, id) => {
  return items?.find((item) => item?.id === id) ? true : false
}

export const findValueAndSetToInput = (params, column) => {
  return params?.[column] || null
}

export const findRegion = (params, column, statics) => {
  const selectedId = params?.filters?.find((item) => item?.column === column)?.value
  const region = statics?.regionList?.find((item) => item?.id === selectedId)
  return region
}

// export const findValueAndSetToSelect = (params, column) => {
//   const selected = params?.filters?.find((f) => f.column === column) || ''
//   return {
//     label: selected?.label,
//     value: selected?.value,
//   }
// }
export const findValueAndSetToSelect = (params, statics, column) => {
  const selected = params?.[column]
  const value = statics?.find((f) => f.value === Number(selected))
  return {
    label: value?.label,
    value: value?.value,
  }
}
export const findIdAndSetToSelect = (params, statics, column) => {
  const selected = params?.filters?.find((f) => f.column === column)?.value ?? ''
  const value = statics?.find((f) => f.id === selected)
  return {
    label: value?.name,
    value: value?.id,
  }
}

export const addFilter = (setParams, column, value) => {
  setParams((prev) => ({
    ...prev,
    [column]: value,
    page: 1,
  }))
}
export const handleSelectChange = (
  setParams,
  setSearchParams,
  params,
  column,
  value,
  operator = 'and',
) => {
  setParams((prev) => {
    let updatedFilters = prev.filters.filter((f) => f.column !== column)
    console.log(value)
    if (value !== null && value !== undefined && value !== '') {
      updatedFilters = [...updatedFilters, { column, value, operator }]
    }
    const query = {
      page: 1,
      limit: params.limit,
      sort: JSON.stringify(params.sort),
      filters: JSON.stringify(updatedFilters),
    }
    setSearchParams(query)
    return { ...prev, filters: updatedFilters }
  })
}

export const addSort = (setParams, column, value) => {
  let switchValue = ''
  switch (value) {
    case 'asc':
      switchValue = 'ASC'
      break
    case 'desc':
      switchValue = 'DESC'
      break
    default:
      switchValue = null
      break
  }
  setParams((prev) => ({
    ...prev,
    sort: switchValue ? { column, value: switchValue } : {},
  }))
}

export const handleDateRangeChange = (column, startDate, endDate) => {
  if (startDate && endDate) {
    const formattedValue = `${startDate}_${endDate}`
    handleFilterChange(column, formattedValue, 'between')
  } else {
    handleFilterChange(column, '', 'between') // Tozalash uchun
  }
}

export const handlePagination = (setParams, key, value) => {
  setParams((prev) => ({
    ...prev,
    [key]: value,
  }))
}

export const getDateTime = (e, values) => {
  if (e && e?.length === 2) {
    return `${values?.[0]}_${values?.[1]}`
  }
}

export const copyText = (text) => {
  navigator.clipboard.writeText(text)
  toast.success('Копировано')
}

export const numberFormat = (string) => {
  return string ? Number(string).toLocaleString('ru-RU') : 0
}

export const renderJsonData = (data) => {
  return <pre>{JSON.stringify(data, null, 2)}</pre>
}

export const includesValues = [undefined]

export const unshowElement = (unshow, role) => {
  if (!unshow) return true
  return !unshow?.includes(role)
}

export const statusList = [
  {
    label: 'Не актив',
    value: 0,
  },
  {
    label: 'Актив',
    value: 1,
  },
]
export const roleList = [
  {
    label: 'Admin',
    value: 1,
  },
  {
    label: 'Super Admin',
    value: 2,
  },
]
export const userStatusMap = { 1: 'success', 0: 'danger' }
