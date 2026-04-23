import React, { useState, useEffect } from 'react'
import { format, parse } from 'date-fns'
import { CButton, CDateRangePicker } from '@coreui/react-pro'
import CIcon from '@coreui/icons-react'
import { cilXCircle } from '@coreui/icons'

const DatePicker = ({ params, handleSearch, column, label, style, updateSearchParams }) => {
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)

  const clear = () => {
    updateSearchParams({
      page: 1,
      [column]: undefined,
      dateType: undefined,
    })

    setStartDate(null)
    setEndDate(null)
  }

  useEffect(() => {
    const value = params?.[column]

    if (!value) {
      setStartDate(null)
      setEndDate(null)
      return
    }

    const [start, end] = value.split('_')
    setStartDate(new Date(start))
    setEndDate(new Date(end))
  }, [params, column])

  const handleDateChange = (start, end) => {
    setStartDate(start)
    setEndDate(end)

    if (start && end) {
      updateSearchParams({
        [column]: `${format(start, 'yyyy-MM-dd')}_${format(end, 'yyyy-MM-dd')}`,
        dateType: 'between',
        page: 1,
      })
    } else {
      updateSearchParams({
        [column]: undefined,
        dateType: undefined,
        page: 1,
      })
    }
  }

  return (
    <div>
      {label && <div style={{ marginBottom: '8px' }}>{label}</div>}

      <CDateRangePicker
        size="sm"
        footer
        confirmButton={
          <CButton color="primary" onClick={handleSearch}>
            Искать
          </CButton>
        }
        style={style}
        locale="ru-RU"
        placeholder={['Дата нач', 'дата окон']}
        inputDateParse={(date) => parse(date, 'yyyy-MM-dd', new Date())}
        inputDateFormat={(date) => format(new Date(date), 'yyyy-MM-dd')}
        onStartDateChange={(date) => handleDateChange(date, endDate)}
        onEndDateChange={(date) => handleDateChange(startDate, date)}
        startDate={startDate}
        endDate={endDate}
        cancelButton={false}
        todayButton={false}
        cleaner={
          <div
            onClick={clear}
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

export default DatePicker
