import { useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts'
import S from './styles.module.scss'
import { api } from '../../services/api'
import { set } from 'zod'

export function DashSpline() {
  const [monthlyDataForDay, setMonthlyDataForDay] = useState([])
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

    try {
      const response = await api.put(
        `/monthlyDataForDay/${getClinicId()}`,
        dataToSend
      )
      setMonthlyDataForDay(response.data)
      const extractedDays = response.data.detalhes_por_dia.map(item => item.dia)
      setDaysOnly(extractedDays)

      const updatedSeries = response.data.detalhes_por_dia.reduce(
        (acc, item) => {
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
          return acc
        },
        []
      )

      setSeries(updatedSeries)
      console.log(response.data, 'teste', updatedSeries)
    } catch (error) {
      console.log(error)
    }
  }

  const getClinicId = () => {
    const userDataString = localStorage.getItem('user')
    const userData = JSON.parse(userDataString)
    const clinicId = userData?.user?.clinicaId
    return clinicId
  }

  // const series = [
  //   {
  //     name: 'Dr. Paulo',
  //     data: [3110, 2140]
  //   },
  //   {
  //     name: 'Dr. Miriam',
  //     data: [2511, 1232]
  //   },
  //   {
  //     name: 'Dr. Yasmim',
  //     data: [1050, 3245]
  //   }
  // ]

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
      categories: daysOnly
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
