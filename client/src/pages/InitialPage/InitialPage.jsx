
import { Card } from '../../components/Card/Card'
import { Header } from '../../components/Header/Header'
import { DashPie } from '../../components/DashPie/DashPie'
import { DashSpline } from '../../components/DashSpline/DashSpline'
import { BiSearch } from 'react-icons/bi'
import S from './styles.module.scss'
import { useEffect, useState } from 'react'
import { api } from '../../services/api'



export function InitialPage() {
  const [initialDate, setInitialDate] = useState('')
  const [finalDate, setFinalDate] = useState('')

  const [dailyData, setDailyData] = useState([])
  const [monthlyData, setMonthlyData] = useState([])
  const [dataForPeriod, setDataForPeriod] = useState([])

  useEffect(() => {
    fetchDailyData()
    fetchMonthlyData()
  }, [])

  const fetchDailyData = async () => {
    const currentDate = new Date()
    const year = currentDate.getFullYear()
    const month = String(currentDate.getMonth() + 1).padStart(2, '0')
    const day = String(currentDate.getDate()).padStart(2, '0')

    const formattedDate = `${year}-${month}-${day}`

    const dataToSend = {
      data: formattedDate
    }

    api
      .put(`/dailyData/${getClinicId()}`, dataToSend)
      .then(response => {
        setDailyData(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  }

  const fetchMonthlyData = async () => {
    const currentDate = new Date()
    const year = currentDate.getFullYear()
    const month = String(currentDate.getMonth() + 1).padStart(2, '0')

    const formattedDate = `${year}-${month}`

    const dataToSend = {
      data: formattedDate
    }

    api
      .put(`/monthlyData/${getClinicId()}`, dataToSend)
      .then(response => {
        setMonthlyData(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  }

  const getClinicId = () => {
    const userDataString = localStorage.getItem('user')
    const userData = JSON.parse(userDataString)
    const clinicId = userData?.user?.clinicaId
    return clinicId
  }

  const handleDateSubmit = e => {
    e.preventDefault();
    const dataToSend = {
      data_inicial: initialDate,
      data_final: finalDate
    }

    api
      .put(`/dataForPeriod/${getClinicId()}`, dataToSend)
      .then(response => {
        setDataForPeriod(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <>
      <Header />
      <div className={S.dashboard}>
        <div className={S.cards_date}>
          <div className={S.cards}>
            <Card title="Saldo Diário" money={dailyData.valor_total} />
            <Card title="Saldo Mensal" money={monthlyData.valor_total} />
            <Card
              title="Saldo por Período"
              money={dataForPeriod.valor_total}
            />
          </div>
          <div>
            <form className={S.searchDate} onSubmit={handleDateSubmit}>
              <input
                type="date"
                name="initialDate"
                className={S.inputDate}
                onChange={e => setInitialDate(e.target.value)}
              />
              <input
                type="date"
                name="finalDate"
                className={S.inputDate}
                onChange={e => setFinalDate(e.target.value)}
              />
              <button type="submit">
                <BiSearch className={S.iconSearch} />
              </button>
            </form>
          </div>
        </div>
        <div className={S.dashs}>
          <DashPie />
          <DashSpline />
        </div>
      </div>
    </>
  )
}
