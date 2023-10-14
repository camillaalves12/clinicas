import { useState, useEffect } from 'react'
import { Header } from '../../components/Header/Header'
import { api } from '../../services/api'
import S from './styles.module.scss'
import { Search } from '../../components/Search/Search'

export function CreateConsultPage() {

  const [procediments, setProcediments] = useState([])

  const [professionals, setProfessionals] = useState([])

  const [patientId, setPatientId] = useState('')

  const [formData, setFormData] = useState({
    paciente: '',
    profissional: '',
    procedimento: '',
    valor: '',
    forma_de_pagamento: ''
  })

  useEffect(() => {
    fetchProfessionals()
    fetchProcediments()
    console.log(procediments)
  }, [])

  const getClinicId = () => {
    const userDataString = localStorage.getItem('user')
    const userData = JSON.parse(userDataString)
    const clinicId = userData?.user?.clinicaId
    console.log(clinicId)
    return clinicId
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
      .then(dataToSend => {
        console.log(dataToSend)
         api.post(`/consult/${clinicId}`, dataToSend)
            .then(response => {
               alert('Consulta criada com sucesso!')
               console.log(response)
            })
            .catch(error => {
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
        tipo_de_pagamento: formData.forma_de_pagamento,
        clinicaId: getClinicId()
      }

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
    const consultProcediment = 1

    try {
      const response = await api.get(`/procedimentsForType/${consultProcediment}`)

      if (!response.data) {
        alert('Não existem procedimentos de consulta cadastrados!')
      } else {
        setProcediments(response.data)
      }

    } catch (error) {
      
    }
  }

  const getPatientId = (patientId) => {
    setPatientId(patientId)
    console.log("Entrou na função getPatientId" + patientId)
  }

  return (
    <>
      <Header />
      <div className={S.pageCreateConsult}>
        <div className={S.forms}>
          <form
            id="consultaForm"
            className={S.container}
            onSubmit={handleSubmit}
          >
            <div className={S.containerForm}>
              <h3 style={{ marginBottom: '1.5rem' }}>Criar Consulta</h3>

              <Search getPatientId={getPatientId} />

              <div className={S.divForms}>
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
                    {professionals.length > 0 ? professionals.map(professionals => (
                      <option key={professionals.id} value={professionals.id}>
                        {professionals.nome}
                      </option>
                    )) : <option>Nenhum profissional encontrado</option>}
                  </select>
                </div>

                <div>
                  <label className={S.labelForm} for="procedure">
                    Consulta:
                  </label>
                  <select
                    className={S.inputForm}
                    style={{ width: '255px' }}
                    name="procedimento"
                    onChange={handleInputChange}
                    value={formData.procedimento}
                    required
                  >
                    <option>Selecione o procedimento</option>
                    {procediments.length > 0 ? procediments.map(procediments => (
                      <option key={procediments.id} value={procediments.id}>
                        {procediments.nome}
                      </option>
                    )) : <option>Nenhum procedimento encontrado</option>}
                  </select>
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
                    <option option="Cartão de Crédito">
                      Cartão de Crédito
                    </option>
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
        </div>
      </div>
    </>
  )
}
