import { useState, useEffect } from 'react'
import { Header } from '../../components/Header/Header'
import { api } from '../../services/api'
import S from './styles.module.scss'

export function CreateExamPage() {

  const [procediments, setProcediments] = useState([])

  const [professionals, setProfessionals] = useState([])

  const [dataToSend, setDataToSend] = useState([{}])

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

  const fetchProfessionals = async () => {
    try {
      const response = await api.post('/professionalForName')
      if (!response.data) {
        alert('Não existem profissionais cadastrados!')
      } else {
        console.log(response.data)
        setProfessionals(response.data)
      }
    } catch (error) {
      console.error('Erro ao buscar profissional:', error)
    }
  }

  const fetchProcediments = async () => {
    const consultProcediment = 1

    try {
      const response = await api.get(
        `/procediments`
      )

      if (!response.data) {
        alert('Não existem procedimentos de consulta cadastrados!')
      } else {
        console.log(response.data)
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
      .then(dataToSend => {
        console.log(dataToSend)
        api
          .post(`/consult/${clinicId}`, dataToSend)
          .then(response => {
            alert('Exame criado com sucesso!')
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
      const patientCPF = await findPatient(formData.paciente)

      const dataToSend = {
        pacienteId: patientCPF,
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
              <h3 style={{ marginBottom: '1.5rem' }}>Criar Exame</h3>

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

                <div>
                  <label className={S.labelForm} for="type_exam">
                    Tipo de Exame:
                  </label>
                  <select
                    className={S.inputForm}
                    style={{ width: '255px' }}
                    name="type_exam"
                    onChange={handleInputChange}
                    value={formData.procedimento}
                    required
                  >
                    <option>Selecione o tipo de exame</option>
                    {procediments.map(procediments => (
                      <option key={procediments.id} value={procediments.id}>
                        {procediments.nome}
                      </option>
                    ))}
                  </select>
                  
                </div>
              </div>

              <label className={S.labelForm} for="procedure">
                    Exame:
                  </label>
                  <select
                    className={S.inputForm}
                    name="procedure"
                    onChange={handleInputChange}
                    value={formData.procedimento}
                    required
                  >
                    <option>Selecione o exame</option>
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
