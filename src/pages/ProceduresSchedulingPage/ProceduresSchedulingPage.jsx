import S from './styles.module.scss'
import PropTypes from 'prop-types'
import { BiSearch } from 'react-icons/bi'
import { Form, Button } from 'react-bootstrap'
import { Header } from '../../components/Header/Header'
import { useState, useEffect } from 'react'
import { api } from '../../services/api'
import { HiCheck} from "react-icons/hi";
import { HiOutlineX} from "react-icons/hi";


export function ProceduresSchedulingPage() {

  const [schedulings, setSchedulings] = useState([])

  const [date, setDate] = useState('')

  const [professional, setProfessional] = useState('')

  const getClinicId = () => {
    const userDataString = localStorage.getItem('user')
    const userData = JSON.parse(userDataString)
    const clinicId = userData?.user?.clinicaId
    console.log(clinicId)
    return clinicId
  }

  const handleDateSubmit = e => {
    e.preventDefault()

    const dataToSend = {
      data: date
    }

    api
      .put(`/schedulingsForDate`, dataToSend)
      .then(response => {
        console.log(response.data)
        setSchedulings(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  }

  const handleButtonClick = () => {
    const currentDate = new Date()
    const year = currentDate.getFullYear()
    const month = String(currentDate.getMonth() + 1).padStart(2, '0')

    const formattedDate = `${year}-${month}-${day}`

    setDate(formattedDate)
    console.log(formattedDate)
    handleDateSubmit()
  }

  const fetchSchedulings = async () => {
    try {
      const response = await api.get('/schedulings')
      setSchedulings(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchSchedulings()
  }, [])

  const Tabela = () => {
    return (
      <table className={S.table}>
        <thead>
          <tr>
            <th className={S.th_thead}>Paciente</th>
            <th className={S.th_thead}>Profissional</th>
            <th className={S.th_thead}>Procedimento</th>
            <th className={S.th_thead}>Valor</th>
            <th className={S.th_thead}>Horário</th>
            <th className={S.th_thead}>Data</th>
            <th className={S.th_thead}>Criar consulta</th>
          </tr>
        </thead>
        <tbody>
          {schedulings.map(schedulings => (
            <tr key={schedulings.id}>
              <td>{schedulings.paciente.nome}</td>
              <td>{schedulings.profissional.nome}</td>
              <td>{schedulings.procedimento.nome}</td>
              <td>{`R$ ${schedulings.valor_da_consulta}`}</td>
              <td>{schedulings.hora_da_consulta}</td>
              <td>
                {new Date(schedulings.data_da_consulta).toLocaleDateString()}
              </td>

              <td className={S.iconCheck}> 

                <HiCheck style={{width:'3rem'}}/> 
                
                <div className={S.iconCheckX}>
                  <HiOutlineX/>
                </div>

              </td>

            </tr>
          ))}
        </tbody>
      </table>
    )
  }

  return (
    <>
      <Header />
      <div className={S.container}>
        <h2>Agendamentos</h2>
        <div className={S.container_search_and_create}>
          <div className={S.search_and__date}>
            <form className={S.searchDate} onSubmit={handleDateSubmit}>
              <button className={S.btnHoje} onClick={handleButtonClick}>
                Hoje
              </button>
              <input
                type="date"
                name="date"
                className={S.inputDate}
                onChange={e => setDate(e.target.value)}
              />
              <button type="submit">
                <BiSearch className={S.iconSearch} />
              </button>
            </form>
          </div>
        </div>
        <div className={S.divTable}>
          {schedulings.length > 0 ? (
            <Tabela />
          ) : (
            <>
              <table className={S.table}>
                <thead>
                  <tr>
                    <th className={S.th_thead}>Paciente</th>
                    <th className={S.th_thead}>Profissional</th>
                    <th className={S.th_thead}>Procedimento</th>
                    <th className={S.th_thead}>Valor</th>
                    <th className={S.th_thead}>Horário</th>
                    <th className={S.th_thead}>Data</th>
                  </tr>
                </thead>
                <tbody>
                  <p className={S.p}>Nenhuma consulta encontrada</p>
                </tbody>
              </table>
            </>
          )}
        </div>
      </div>
    </>
  )
}
