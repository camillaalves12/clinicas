import S from './styles.module.scss'
import PropTypes from 'prop-types'
import { Link, useParams } from 'react-router-dom'
import { BiSearch } from 'react-icons/bi'
import { Form, Button } from 'react-bootstrap'
import { Header } from '../Header/Header'
import { useEffect, useState } from 'react'
import { api } from '../../services/api'

export function Details() {
  const dados = [
    {
      index: 1,
      patient: 'João',
      professional: 'Marcos',
      procedure_group: 'UILTRASSONOGRAFIA',
      procedures: 'USG DA COXA',
      value: 150,
      form_of_payment: 'pix',
      date: '12/08/2022'
    },
    {
      index: 2,
      patient: 'João',
      professional: 'Marcos',
      procedure_group: 'UILTRASSONOGRAFIA',
      procedures: 'USG DO OMBRO',
      value: 150,
      form_of_payment: 'Cartão de crédito',
      date: 23
    },
    {
      index: 3,
      patient: 'João',
      professional: 'Gisele',
      procedure_group: 'Obtetra',
      procedures: 'blabkabka',
      value: 150,
      form_of_payment: 'pix',
      date: '23/01/2002'
    },
    {
      index: 4,
      patient: 'João',
      professional: 'Antonio',
      procedure_group: 'Obtetra',
      procedures: 'blabkabka',
      value: 150,
      form_of_payment: 'pix',
      date: 23
    },
    {
      index: 5,
      patient: 'João',
      professional: 'Antonio',
      procedure_group: 'Obtetra',
      procedures: 'blabkabka',
      value: 150,
      form_of_payment: 'pix',
      date: 23
    },
    {
      index: 5,
      patient: 'João',
      professional: 'Antonio',
      procedure_group: 'Obtetra',
      procedures: 'blabkabka',
      value: 150,
      form_of_payment: 'pix',
      date: 23
    },
    {
      index: 5,
      patient: 'João',
      professional: 'Antonio',
      procedure_group: 'Obtetra',
      procedures: 'blabkabka',
      value: 150,
      form_of_payment: 'pix',
      date: 23
    },
    {
      index: 5,
      patient: 'João',
      professional: 'Antonio',
      procedure_group: 'Obtetra',
      procedures: 'blabkabka',
      value: 150,
      form_of_payment: 'pix',
      date: 23
    },
    {
      index: 6,
      patient: 'João',
      professional: 'Antonio',
      procedure_group: 'Obtetra',
      procedures: 'blabkabka',
      value: 150,
      form_of_payment: 'pix',
      date: 23
    },
    {
      index: 6,
      patient: 'João',
      professional: 'Antonio',
      procedure_group: 'Obtetra',
      procedures: 'blabkabka',
      value: 150,
      form_of_payment: 'pix',
      date: 23
    },
    {
      index: 6,
      patient: 'João',
      professional: 'Antonio',
      procedure_group: 'Obtetra',
      procedures: 'blabkabka',
      value: 150,
      form_of_payment: 'pix',
      date: 23
    }
  ]

  const params = useParams()
  const pacienteId = params.id

  const [consults, setConsults] = useState([])

  const fetchConsults = async () => {
    try {
      const response = await api.get(`/consultsForPatient/${pacienteId}`)
      setConsults(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchConsults()
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
            <th className={S.th_thead}>Forma de pagamento</th>
            <th className={S.th_thead}>Data</th>
          </tr>
        </thead>
        <tbody>
          {consults.map(consults => (
            <tr key={consults.id}>
              <td>{consults.paciente.nome}</td>
              <td>{consults.profissional.nome}</td>
              <td>{consults.procedimento.nome}</td>
              <td>{`R$ ${consults.valor_da_consulta}`}</td>
              <td>{consults.tipo_de_pagamento}</td>
              <td>{new Date(consults.data_de_criacao).toLocaleDateString()}</td>
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
        <div className={S.divTable}>
          {dados.length > 0 ? (
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
                    <th className={S.th_thead}>Forma de pagamento</th>
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
