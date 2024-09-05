import { useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts'
import S from './styles.module.scss'
import { api } from '../../services/api'
import Refresh from '../../components/Refresh/Refresh'

export function DashSpline() {
  const [daysOnly, setDaysOnly] = useState([])
  const [series, setSeries] = useState([])

  useEffect(() => {
    fetchMonthlyDataForDay()
  }, [])

  const fetchMonthlyDataForDay = async () => {
    const currentDate = new Date()
    const year = currentDate.getFullYear()
    const month = String(currentDate.getMonth() + 1).padStart(2, '0')
  
    const formattedDate = `${year}-${month}`
  
    const dataToSend = {
      data: formattedDate
    }
  
    const getClinicId = () => {
      const userDataString = localStorage.getItem('user')
      const userData = JSON.parse(userDataString)
      const clinicId = userData?.user?.clinicaId
      return clinicId
    }
  
    try {
      const response = await api.put(
        `/dailyData/${getClinicId()}`,
        dataToSend
      )
  
      if (response.data.detalhes_por_dia && Array.isArray(response.data.detalhes_por_dia)) {
        const extractedDays = response.data.detalhes_por_dia.map(item => item.dia);
        setDaysOnly(extractedDays);
  
        const updatedSeries = response.data.detalhes_por_dia.reduce((acc, item) => {
          if (Array.isArray(item.profissionais)) {
            item.profissionais.forEach(professional => {
              const existingSeriesIndex = acc.findIndex(
                serie => serie.name === professional.profissional
              )
              if (existingSeriesIndex !== -1) {
                const existingSeries = acc[existingSeriesIndex]
                existingSeries.data[extractedDays.indexOf(item.dia)] =
                  professional.totalValue
              } else {
                const newData = new Array(extractedDays.length).fill(0)
                newData[extractedDays.indexOf(item.dia)] = professional.totalValue
                acc.push({
                  name: professional.profissional,
                  data: newData
                })
              }
            })
          }
          return acc
        }, [])
  
        setSeries(updatedSeries)
      } else {
        console.log('detalhes_por_dia está vazio ou indefinido');
      }
  
    } catch (error) {
      console.error('Erro ao buscar dados:', error) // Mensagem de erro amigável
    }
  }
  
  if (series.length === 0) {
    return <Refresh title='Carregando' />;
  }

  const options = {
    chart: {
      height: 350,
      type: 'area'
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },
    xaxis: {
      type: 'datetime',
      categories: daysOnly.map(day => new Date(day).toISOString()) // Garantindo formato de data
    },
    tooltip: {
      x: {
        format: 'dd/MM/yy'
      }
    }
  }

  return (
    <div className={S.container}>
      <div className={S.dashSpline}>
        <ReactApexChart options={options} series={series} type="area" />
      </div>
    </div>
  )
}
