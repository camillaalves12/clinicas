import { useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts'
import S from './styles.module.scss'
import { api } from '../../services/api' // Importe a instância do axios ou método de acesso à API

export function DashPie() {
  const [dailyData, setDailyData] = useState() // Inicializando como null

  useEffect(() => {
    fetchDailyData()
  }, [])

  const getClinicId = () => {
    const userDataString = localStorage.getItem('user')
    const userData = JSON.parse(userDataString)
    const clinicId = userData?.user?.clinicaId
    return clinicId
  }

  const fetchDailyData = async () => {
    const currentDate = new Date()
    const year = currentDate.getFullYear()
    const month = String(currentDate.getMonth() + 1).padStart(2, '0')
    const day = String(currentDate.getDate()).padStart(2, '0')

    const formattedDate = `${year}-${month}-${day}`

    const dataToSend = {
      data: formattedDate
    }

    try {
      const response = await api.put(`/dailyData/${getClinicId()}`, dataToSend)
      setDailyData(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  if (!dailyData) {
    return <p>Carregando</p> 
  }


  const series = dailyData.valor_por_profissional.map(
    profissional => profissional.totalValue
  )
  const labels = dailyData.valor_por_profissional.map(
    profissional => `Dr. ${profissional.profissional} - R$ ${profissional.totalValue}`
  )

  const options = {
    labels: labels,
    chart: {
      type: 'polarArea'
    },
    tooltip: {
      y: {
        formatter: function (value, { seriesIndex, dataPointIndex, w }) {
          return ''
        }
      }
    },
    stroke: {
      colors: ['#fff']
    },
    fill: {
      opacity: 0.8
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: '200px'
          },
          legend: {
            position: 'bottom'
          }
        }
      }
    ]
  }

  return (
    <div className={S.container}>
      <div id="chart" className={S.dashPie}>
        <ReactApexChart options={options} series={series} type="polarArea" />
      </div>
    </div>
  )
}
