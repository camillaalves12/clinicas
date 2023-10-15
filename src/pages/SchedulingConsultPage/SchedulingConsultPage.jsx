import { useState, useEffect } from 'react'
import S from './styles.module.scss'
import { Header } from '../../components/Header/Header'
import { api } from '../../services/api'
import { Search } from '../../components/Search/Search'

export function SchedulingConsultPage() {

  const [procediments, setProcediments] = useState([])

  const [professionals, setProfessionals] = useState([])

  const [patientId, setPatientId] = useState('')

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

    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    const clinicId = getClinicId()

    processForm()
      .then(dataToSend => {
        console.log(dataToSend)
        api
          .post(`/scheduling/${clinicId}`, dataToSend)
          .then(response => {
            alert('Agendamento criado com sucesso!')
            console.log(response)
          })
          .catch(error => {
            alert('Erro ao processar o formulário:', error)
            console.error('Erro ao processar o formulário:', error)
          })
      })
      .catch(error => {
        console.error('Erro ao processar o formulário:', error)
      })
  }

  const processForm = async () => {
    try {

      const dataToSend = {
        pacienteId: parseInt(patientId),
        profissionalId: parseInt(formData.profissional),
        procedimentoId: parseInt(formData.procedimento),
        valor_da_consulta: parseInt(formData.valor),
        data_da_consulta: formData.data_da_consulta,
        hora_da_consulta: formData.hora_da_consulta,
        clinicaId: getClinicId()
      }

      return dataToSend
    } catch (error) {
      console.error('Erro ao processar o formulário:', error)
    }
  }

  const getPatientId = patientId => {
    setPatientId(patientId)
    console.log('Entrou na função getPatientId' + patientId)
  }

  return (
    <>
      <Header />
      <form id="schedulingForm" className={S.container} onSubmit={handleSubmit}>
        <div className={S.containerForm}>
          <h3 style={{ marginBottom: '1.5rem' }}>Agendamento</h3>

          <Search getPatientId={getPatientId} />

          <div className={S.divForms}>
            <div>
              <label className={S.labelForm} for="procedure">
                Procedimento:
              </label>
              <select
                style={{ width: '255px' }}
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
            </div>

            <div>
              <div>
                <label className={S.labelForm} for="professional">
                  Profissional:
                </label>
                <select
                  className={S.inputForm}
                  style={{ width: '255px' }}
                  name="profissional"
                  onChange={handleInputChange}
                  value={formData.profissional}
                  required
                >
                  <option>Selecione o profissional</option>
                  {professionals.map(professionals => (
                    <option key={professionals.id} value={professionals.id}>
                      {professionals.nome}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

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
              <label className={S.labelForm} for="hour_procedure">
                Horário:
              </label>
              <input
                className={S.inputForm}
                style={{ width: '255px' }}
                name="hora_da_consulta"
                onChange={handleInputChange}
                value={formData.hora_da_consulta}
              />
            </div>
          </div>

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
