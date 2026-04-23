import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

import {
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
  CWidgetStatsA,
  CWidgetStatsF,
} from '@coreui/react'
import { getStyle } from '@coreui/utils'
import { CChartBar, CChartLine } from '@coreui/react-chartjs'
import CIcon from '@coreui/icons-react'
import { cilArrowBottom, cilArrowTop, cilChartPie, cilOptions } from '@coreui/icons'
import statsStore from '../../store/stats'
import dashboardStore from '../../store/dashboard'
import { numberFormat } from '../../utils'

const WidgetsDropdown = (props) => {
  const { list, listLoading, getList } = dashboardStore()
  // const { list, clientsMaxCount, productsMaxCount } = statsStore()
  const widgetChartRef1 = useRef(null)
  const widgetChartRef2 = useRef(null)

  useEffect(() => {
    document.documentElement.addEventListener('ColorSchemeChange', () => {
      if (widgetChartRef1.current) {
        setTimeout(() => {
          widgetChartRef1.current.data.datasets[0].pointBackgroundColor = getStyle('--cui-primary')
          widgetChartRef1.current.update()
        })
      }

      if (widgetChartRef2.current) {
        setTimeout(() => {
          widgetChartRef2.current.data.datasets[0].pointBackgroundColor = getStyle('--cui-info')
          widgetChartRef2.current.update()
        })
      }
    })
  }, [widgetChartRef1, widgetChartRef2])
  useEffect(() => {
    getList()
  }, [])
  return (
    <CRow className={props.className} xs={{ gutter: 4 }}>
      <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsF
          className="mb-3"
          color="primary"
          icon={<CIcon icon={cilChartPie} height={24} />}
          padding={false}
          title="Количество услуги"
          value={numberFormat(list?.comissionCount)}
        />
      </CCol>
      <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsF
          className="mb-3"
          color="primary"
          icon={<CIcon icon={cilChartPie} height={24} />}
          padding={false}
          title="Сумма услуги"
          value={numberFormat(list?.comissionAmount)}
        />
      </CCol>
      <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsF
          className="mb-3"
          color="primary"
          icon={<CIcon icon={cilChartPie} height={24} />}
          padding={false}
          title="Количество операторов"
          value={numberFormat(list?.operatorsCount)}
        />
      </CCol>
      <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsF
          className="mb-3"
          color="primary"
          icon={<CIcon icon={cilChartPie} height={24} />}
          padding={false}
          title="Обший оборот"
          value={numberFormat(list?.totalAmount)}
        />
      </CCol>
      <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsF
          className="mb-3"
          color="primary"
          icon={<CIcon icon={cilChartPie} height={24} />}
          padding={false}
          title="Обшая количество"
          value={numberFormat(list?.totalCount)}
        />
      </CCol>
      <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsF
          className="mb-3"
          color="primary"
          icon={<CIcon icon={cilChartPie} height={24} />}
          padding={false}
          title="Количество бухгалтеров"
          value={numberFormat(list?.accountantsCount)}
        />
      </CCol>
      <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsF
          className="mb-3"
          color="primary"
          icon={<CIcon icon={cilChartPie} height={24} />}
          padding={false}
          title="Количество инкасаторов"
          value={numberFormat(list?.couriersCount)}
        />
      </CCol>
      <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsF
          className="mb-3"
          color="primary"
          icon={<CIcon icon={cilChartPie} height={24} />}
          padding={false}
          title="Количество менеджеров"
          value={numberFormat(list?.managersCount)}
        />
      </CCol>
    </CRow>
  )
}

WidgetsDropdown.propTypes = {
  className: PropTypes.string,
  withCharts: PropTypes.bool,
}

export default WidgetsDropdown
