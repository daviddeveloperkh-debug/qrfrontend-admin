import React, { useState, useEffect } from 'react'
import { format, parse, isValid } from 'date-fns'
import { CButton, CDatePicker } from '@coreui/react-pro'
import { addFilter } from '../../../utils'
import CIcon from '@coreui/icons-react'
import { cilXCircle } from '@coreui/icons'

const CDatePickerComponent = ({
  params,
  setParams,
  handleSearch,
  column,
  onClear,
  label,
  style,
}) => {
  const [date, setDate] = useState(null)

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate) // 🔄 local holatni yangilash
    const formattedValue = format(selectedDate, 'yyyy-MM-dd')
    addFilter(setParams, column, formattedValue, 'date')
  }
  const removeFilter = () => {
    onClear?.(setParams, column, null, 'date')
  }

  useEffect(() => {
    const filter = params.filters?.find((f) => f.column === column)
    if (filter?.value) {
      const parsedDate = new Date(filter.value)
      if (isValid(parsedDate)) {
        setDate(parsedDate)
      } else {
        removeFilter()
        setDate(null)
        console.warn('Invalid date in filters:', filter.value)
      }
    } else {
      setDate(null)
    }
  }, [params?.filters, column])

  return (
    <div>
      {label && <div style={{ marginBottom: '8px' }}>{label}</div>}
      <CDatePicker
        size="sm"
        footer
        date={date}
        style={style}
        locale="ru-RU"
        placeholder={'Время'}
        onDateChange={(date) => {
          if (date === null) {
            onClear?.()
            setDate(null)
          } else {
            handleDateChange(date)
          }
        }}
        confirmButton={
          <CButton color="primary" onClick={handleSearch}>
            Искать
          </CButton>
        }
        inputDateParse={(date) => (date ? parse(date, 'yyyy-MM-dd', new Date()) : null)}
        inputDateFormat={(date) =>
          date && isValid(new Date(date)) ? format(new Date(date), 'yyyy-MM-dd') : ''
        }
        cancelButton={false}
        cleaner={
          <div
            onClick={() => {
              onClear?.()
              setDate(null)
              console.log('asdsadasdas')
            }}
            style={{
              height: '21px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <CIcon icon={cilXCircle} style={{ width: '14px', height: '14px' }} />
          </div>
        }
      />
    </div>
  )
}

export default CDatePickerComponent
