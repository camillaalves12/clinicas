import { Header } from '../../components/Header/Header'
import React, { useState } from 'react'
import S from './styles.module.scss'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import ReactPDF, { PDFDownloadLink } from '@react-pdf/renderer'
import { api } from '../../services/api'

import { ResultFound } from '../../components/ResultFound/ResultFound'
import { ResultNotFound } from '../../components/ResultNotFound/ResultNotFound'
import { DocumentReport } from '../../components/DocumentReport/DocumentReport'

export function ReportDocumentsPage(props) {
  const [professinal, setProfessional] = useState('')
  const [inicialDate, setInicialDate] = useState('')
  const [finalDate, setFinalDate] = useState('')
  const [day, setDay] = useState('')
  const [month, setMonth] = useState('')
  const [year, setYear] = useState('')
  const [searchRoute, setSearchRoute] = useState('')

  const [nameOrCPF, setNameOrCPF] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [patients, setPatients] = useState([])


  const handleSearch = async event => {
    event.preventDefault() // Impede que o formulário seja enviado por requisição HTTP tradicional

    try {
      let response

      switch (searchRoute) {
        case 'professional':
          console.log('professinal', professinal)
          break
        case 'period':
          // response = await api.post('/patientForDateOfBirth', {
          //   data_de_nasc: dateOfBirth
          // })
          console.log('inicialDate', inicialDate)
          console.log('finalDate', finalDate)
          break
        case 'day':
          console.log('day', day)
          break
        case 'month':
          console.log('month', month)
          console.log('year', year)
          break
        default:
          return // Se nenhuma rota válida foi selecionada, não faz nada
      }

      // O resultado da API será um array de pacientes correspondentes
      setPatients(response.data)
    } catch (error) {
      console.error('Erro ao buscar pacientes:', error)
    }
  }

  return (
    <>
      <Header />
      <Form className={S.container} onSubmit={handleSearch}>
        <div className={S.containerForm}>
          <h2 style={{ marginBottom: '1.5rem' }}>Relatório</h2>
          <Form.Group className="mb-3" id="searchRoute">
            <Form.Label>Buscar por:</Form.Label>
            <Form.Select
              value={searchRoute}
              onChange={e => setSearchRoute(e.target.value)}
              style={{
                outline: 'none',
                boxShadow: 'none',
                border: '1px solid #cdcdcd'
              }}
            >
              <option value="">Selecione uma opção</option>
              <option value="professional">Profissional</option>
              <option value="period">Período</option>
              <option value="day">Dia </option>
              <option value="month">Mês</option>
            </Form.Select>
          </Form.Group>

          {searchRoute === 'professional' ? (
            <Form.Group className="mb-3" id="professional">
              <Form.Label>Nome do profissional</Form.Label>
              <Form.Control
                required
                type="text"
                style={{
                  outline: 'none',
                  boxShadow: 'none',
                  border: '1px solid #cdcdcd'
                }}
                value={professinal}
                onChange={e => setProfessional(e.target.value)}
              />
            </Form.Group>
          ) : null}

          {searchRoute === 'period' ? (
            <Form.Group className="mb-3" id="period">
              <Form.Label>Data inicial:</Form.Label>
              <Form.Control
                required
                className={S.inputDoctor}
                type="date"
                style={{
                  outline: 'none',
                  boxShadow: 'none',
                  border: '1px solid #cdcdcd'
                }}
                value={inicialDate}
                onChange={e => setInicialDate(e.target.value)}
              />
              <Form.Label>Data final:</Form.Label>
              <Form.Control
                required
                className={S.inputDoctor}
                type="date"
                style={{
                  outline: 'none',
                  boxShadow: 'none',
                  border: '1px solid #cdcdcd'
                }}
                value={finalDate}
                onChange={e => setFinalDate(e.target.value)}
              />
            </Form.Group>
          ) : null}

          {searchRoute === 'day' ? (
            <Form.Group className="mb-3" id="day">
              <Form.Label>Dia</Form.Label>
              <Form.Control
                required
                type="date"
                style={{
                  outline: 'none',
                  boxShadow: 'none',
                  border: '1px solid #cdcdcd'
                }}
                value={day}
                onChange={e => setDay(e.target.value)}
              />
            </Form.Group>
          ) : null}

          {searchRoute === 'month' ? (
            <Form.Group className="mb-3" id="month">
              <Form.Label>Mês</Form.Label>
              <Form.Control
                as="select"
                required
                style={{
                  outline: 'none',
                  boxShadow: 'none',
                  border: '1px solid #cdcdcd'
                }}
                value={month}
                onChange={e => setMonth(e.target.value)}
              >
                <option value="">Selecione o mês</option>
                <option value="01">Janeiro</option>
                <option value="02">Fevereiro</option>
                <option value="03">Março</option>
                <option value="04">Abril</option>
                <option value="05">Maio</option>
                <option value="06">Junho</option>
                <option value="07">Julho</option>
                <option value="08">Agosto</option>
                <option value="09">Setembro</option>
                <option value="10">Outubro</option>
                <option value="11">Novembro</option>
                <option value="12">Dezembro</option>
              </Form.Control>
              <Form.Label>Ano</Form.Label>
              <Form.Control
                required
                type="number"
                style={{
                  outline: 'none',
                  boxShadow: 'none',
                  border: '1px solid #cdcdcd'
                }}
                value={year}
                onChange={e => setYear(e.target.value)}
              />
            </Form.Group>
          ) : null}

          <div className={S.btnSearch}>
            <Button
              type="submit"
              style={{ width: '250px', height: '38px', textAlign: 'center' }}
            >
              Procurar
            </Button>
          </div>
          <div className={S.btnSearch}>
            <PDFDownloadLink document={<DocumentReport />} fileName="relatorio.pdf"> 
            {({loading}) => (loading ? 'Carregando documento...' : 'Baixar relatório') }
            </PDFDownloadLink>
            
          </div>
        </div>
      </Form>

      {patients.length > 0 ? (
        <ResultFound dados={patients} />
      ) : (
        <ResultNotFound />
      )}
    </>
  )
}
