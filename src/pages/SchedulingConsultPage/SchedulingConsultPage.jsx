import { useState, useEffect } from 'react'
import S from './styles.module.scss'
import { Header } from '../../components/Header/Header'
import { api } from '../../services/api'

export function SchedulingConsultPage() {
  const date = [
    { id: 1, hours: '10:00' },
    { id: 2, hours: '10:30' },
    { id: 3, hours: '12:00' },

  ]

  const [procediments, setProcediments] = useState([])

  const [professionals, setProfessionals] = useState([])

  const [dataToSend, setDataToSend] = useState([{}])

  const [formData, setFormData] = useState({
    paciente: '',
    profissional: '',
    procedimento: '',
    valor: '',
    data_da_consulta: '',
    hora_da_consulta: ''
  })

  useEffect(() => {
    fetchProfessionals()
    fetchProcediments()
  }, [])

  const getClinicId = () => {
    const userDataString = localStorage.getItem('user')
    const userData = JSON.parse(userDataString)
    const clinicId = userData?.user?.clinicaId
    return clinicId
  }

  const fetchProfessionals = async () => {
    try {
      const response = await api.post('/professionalForName')
      if (!response.data) {
        alert('Não existem profissionais cadastrados!')
      } else {
        setProfessionals(response.data)
      }
    } catch (error) {
      console.error('Erro ao buscar profissional:', error)
    }
  }

  const fetchProcediments = async () => {
    try {
      const response = await api.get(`/procediments`)

      if (!response.data) {
        alert('Não existem procedimentos de consulta cadastrados!')
      } else {
        setProcediments(response.data)
      }
    } catch (error) {}
  }

  const handleInputChange = e => {
    const { name, value } = e.target

    // Verifica se o campo é o CPF e formata o valor com pontos e traço
    if (name === 'paciente') {
      const formattedCPF = formatCPF(value)
      setFormData({ ...formData, [name]: formattedCPF })
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const formatCPF = value => {
    // Remove qualquer caractere não numérico do valor do CPF
    const numericCPF = value.replace(/\D/g, '')

    // Aplica a formatação: XXX.XXX.XXX-XX
    const formattedCPF = numericCPF.replace(
      /(\d{3})(\d{3})(\d{3})(\d{2})/,
      '$1.$2.$3-$4'
    )
    return formattedCPF
  }

  const handleSubmit = e => {
    e.preventDefault()
    const clinicId = getClinicId()

    processForm()
    // .then(dataToSend => {
    //   console.log(dataToSend)
    //   api
    //     .post(`/consult/${clinicId}`, dataToSend)
    //     .then(response => {
    //       alert('Exame criado com sucesso!')
    //       console.log(response)
    //     })
    //     .catch(error => {
    //       console.error('Erro ao processar o formulário:', error)
    //     })
    // })
    // .catch(error => {
    //   console.error('Erro ao processar o formulário:', error)
    // })
  }

  const processForm = async () => {
    try {
      const patientCPF = await findPatient(formData.paciente)

      const dataToSend = {
        pacienteId: patientCPF,
        profissionalId: parseInt(formData.profissional),
        procedimentoId: parseInt(formData.procedimento),
        valor_da_consulta: parseInt(formData.valor),
        data_da_consulta: formData.data_da_consulta,
        hora_da_consulta: formData.hora_da_consulta,
        clinicaId: getClinicId()
      }

      console.log(dataToSend)
      return dataToSend
    } catch (error) {
      console.error('Erro ao processar o formulário:', error)
    }
  }

  const findPatient = async patient => {
    try {
      const response = await api.post('/patientForCPF', { cpf: patient })

      if (!response.data.id) {
        alert('Paciente não encontrado')
      } else {
        return response.data.id
      }
    } catch (error) {
      console.error('Erro ao buscar paciente:', error)
    }
  }

  return (
    <>
      <Header />
      <form id="schedulingForm" className={S.container} onSubmit={handleSubmit}>
        <div className={S.containerForm}>
          <h3 style={{ marginBottom: '1.5rem' }}>Agendamento</h3>

          <label className={S.labelForm} for="paciente">
            Paciente (CPF):
          </label>
          <input
            className={S.inputForm}
            type="text"
            id="paciente"
            name="paciente"
            onChange={handleInputChange}
            value={formData.paciente}
            required
          />

          <div className={S.divForms}>
            <div>
              <label className={S.labelForm} for="date_procedure">
                Data do procedimento:
              </label>
              <input
                className={S.inputForm}
                style={{ width: '255px', padding: '5px' }}
                type="date"
                id="date_procedure"
                name="data_da_consulta"
                onChange={handleInputChange}
                value={formData.data_da_consulta}
                required
              />
            </div>

            <div>
              <label className={S.labelForm} for="procedure">
                Horário:
              </label>
              <select
                className={S.inputForm}
                style={{ width: '255px' }}
                name="hora_da_consulta"
                onChange={handleInputChange}
                value={formData.hora_da_consulta}
              >
                <option>Selecione o horário</option>
                {date.map(date => (
                  <option key={date.id} value={date.hours}>
                    {date.hours}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <label className={S.labelForm} for="procedure">
            Procedimento:
          </label>
          <select
            className={S.inputForm}
            name="procedimento"
            onChange={handleInputChange}
            value={formData.procedimento}
            required
          >
            <option>Selecione o procedimento</option>
            {procediments.map(procediments => (
              <option key={procediments.id} value={procediments.id}>
                {procediments.nome}
              </option>
            ))}
          </select>

          <div className={S.divForms}>
            <div>
              <label className={S.labelForm} for="valor">
                Valor:
              </label>
              <input
                className={S.inputForm}
                style={{ width: '235px' }}
                type="text"
                id="valor"
                step="0.01"
                name="valor"
                onChange={handleInputChange}
                value={formData.valor}
                required
              />
            </div>

            <div>
              <label className={S.labelForm}>Forma de Pagamento:</label>
              <select
                className={S.inputForm}
                style={{ width: '275px' }}
                name="forma_de_pagamento"
                onChange={handleInputChange}
                value={formData.forma_de_pagamento}
                required
              >
                <option option="Selecione a forma de pagamento">
                  Selecione a forma de pagamento
                </option>
                <option option="Dinheiro">Dinheiro</option>
                <option option="Cartão de Crédito">Cartão de Crédito</option>
                <option option="Cartão de Débito">Cartão de Débito</option>
                <option option="Cheque">Pix</option>
              </select>
            </div>
          </div>

          <div className={S.divBtn}>
            <input className={S.btn} type="submit" option="Enviar" />
          </div>
        </div>
      </form>
    </>
  )
}
