'use client'

import React, { useEffect } from 'react'
import { CCard, CCardBody, CCol, CCardHeader, CRow } from '@coreui/react'
import {
  CChartBar,
  CChartDoughnut,
  CChartLine,
  CChartPie,
  CChartPolarArea,
  CChartRadar,
} from '@coreui/react-chartjs'
import { statsStore } from '../../store/index'

const Charts = () => {
  const { getList } = statsStore()
  const list = [
    {
      month: '2026-04',
      total: 142,
    },
    {
      month: '2026-05',
      total: 143,
    },
    {
      month: '2026-06',
      total: 324,
    },
    {
      month: '2026-07',
      total: 12,
    },
    {
      month: '2026-08',
      total: 53,
    },
    {
      month: '2026-09',
      total: 23,
    },
  ]

  useEffect(() => {
    getList()
  }, [])

  // 📅 Month formatter
  const formatMonth = (month) => {
    const [year, m] = month.split('-')
    const date = new Date(Number(year), Number(m) - 1)
    return date.toLocaleString('en-US', {
      month: 'short',
      year: 'numeric',
    })
  }

  // 🔥 Normalized data
  const labels = list?.map((item) => formatMonth(item.month)) || []
  const values = list?.map((item) => item.total) || []

  // 🎨 Colors (reuse everywhere)
  const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40']

  return (
    <CRow>
      {/* BAR */}
      <CCol xs={6}>
        <CCard className="mb-4">
          <CCardHeader>Bar Chart</CCardHeader>
          <CCardBody>
            <CChartBar
              data={{
                labels,
                datasets: [
                  {
                    label: 'Foydalanuvchilar',
                    backgroundColor: '#36A2EB',
                    data: values,
                  },
                ],
              }}
            />
          </CCardBody>
        </CCard>
      </CCol>

      {/* LINE */}
      <CCol xs={6}>
        <CCard className="mb-4">
          <CCardHeader>Line Chart</CCardHeader>
          <CCardBody>
            <CChartLine
              data={{
                labels,
                datasets: [
                  {
                    label: 'Foydalanuvchilar',
                    borderColor: '#4BC0C0',
                    backgroundColor: 'rgba(75,192,192,0.2)',
                    data: values,
                  },
                ],
              }}
            />
          </CCardBody>
        </CCard>
      </CCol>

      {/* DOUGHNUT */}
      <CCol xs={6}>
        <CCard className="mb-4">
          <CCardHeader>Doughnut Chart</CCardHeader>
          <CCardBody>
            <CChartDoughnut
              data={{
                labels,
                datasets: [
                  {
                    backgroundColor: colors,
                    data: values,
                  },
                ],
              }}
            />
          </CCardBody>
        </CCard>
      </CCol>

      {/* PIE */}
      <CCol xs={6}>
        <CCard className="mb-4">
          <CCardHeader>Pie Chart</CCardHeader>
          <CCardBody>
            <CChartPie
              data={{
                labels,
                datasets: [
                  {
                    data: values,
                    backgroundColor: colors,
                  },
                ],
              }}
            />
          </CCardBody>
        </CCard>
      </CCol>

      {/* POLAR */}
      <CCol xs={6}>
        <CCard className="mb-4">
          <CCardHeader>Polar Area</CCardHeader>
          <CCardBody>
            <CChartPolarArea
              data={{
                labels,
                datasets: [
                  {
                    data: values,
                    backgroundColor: colors,
                  },
                ],
              }}
            />
          </CCardBody>
        </CCard>
      </CCol>

      {/* RADAR */}
      <CCol xs={6}>
        <CCard className="mb-4">
          <CCardHeader>Radar Chart</CCardHeader>
          <CCardBody>
            <CChartRadar
              data={{
                labels,
                datasets: [
                  {
                    label: 'Current',
                    backgroundColor: 'rgba(54,162,235,0.2)',
                    borderColor: '#36A2EB',
                    data: values,
                  },
                  {
                    label: 'Previous',
                    backgroundColor: 'rgba(255,99,132,0.2)',
                    borderColor: '#FF6384',
                    data: values.map((v) => Math.round(v * 0.8)),
                  },
                ],
              }}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Charts
