import { useState, useEffect } from 'react'
import { Header } from '../../components/Header/Header'
import { api } from '../../services/api'
import S from './styles.module.scss'
import { Search } from '../../components/Search/Search'

export function CreateExamPage() {

  const [procedimentsType, setProcedimentsType] = useState([])

  const [procediments, setProcediments] = useState([])

  const [professionals, setProfessionals] = useState([])

  const [patientId, setPatientId] = useState('')

  const [formData, setFormData] = useState({
    paciente: '',
    profissional: '',
    procedimento: '',
    valor: '',
    forma_de_pagamento: '',
    tipo_de_procedimento: ''
  })

  useEffect(() => {
    fetchProfessionals()
    fetchProcedimentsType()
  }, [])

  useEffect(() => {
    fetchProcediments()
  }, [formData.tipo_de_procedimento])

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
        console.log(response.data)
        setProfessionals(response.data)
      }
    } catch (error) {
      console.error('Erro ao buscar profissional:', error)
    }
  }

  const fetchProcediments = async () => {

    try {
      const response = await api.get(
        `/procedimentsForType/${parseInt(formData.tipo_de_procedimento)}`
      )

      if (!response.data) {
        alert('Não existem procedimentos de consulta cadastrados!')
      } else {
        console.log(response.data)
        setProcediments(response.data)
      }
    } catch (error) {}
  }

  const fetchProcedimentsType = async () => {
    const consultProcediment = 1

    try {
      const response = await api.get(
        `/procedimentTypes`
      )

      if (!response.data) {
        alert('Não existem procedimentos de consulta cadastrados!')
      } else {
        console.log(response.data)
        setProcedimentsType(response.data)
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
        api
          .post(`/consult/${clinicId}`, dataToSend)
          .then(response => {
            alert('Exame criado com sucesso!')
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

  const getPatientId = patientId => {
    setPatientId(patientId)
    console.log('Entrou na função getPatientId' + patientId)
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
                  <label className={S.labelForm} for="tipo_de_procedimento">
                    Tipo de Exame:
                  </label>
                  <select
                    className={S.inputForm}
                    style={{ width: '255px' }}
                    name="tipo_de_procedimento"
                    onChange={handleInputChange}
                    value={formData.tipo_de_procedimento}
                    required
                  >
                    <option>Selecione o tipo de exame</option>
                    {procedimentsType.length > 0 ? procedimentsType.map(procedimentsType => (
                      <option key={procedimentsType.id} value={procedimentsType.id}>
                        {procedimentsType.nome}
                      </option>
                    )) : <option>Nenhum tipo de exame encontrado</option>}
                  </select>
                  
                </div>
              </div>

              <label className={S.labelForm} for="procedimento">
                    Exame:
                  </label>
                  <select
                    className={S.inputForm}
                    name="procedimento"
                    onChange={handleInputChange}
                    value={formData.procedimento}
                    required
                  >
                    <option>Selecione o exame</option>
                    {procediments.length > 0 ? procediments.map(procediments => (
                      <option key={procediments.id} value={procediments.id}>
                        {procediments.nome}
                      </option>
                    )) : <option>Nenhum exame encontrado</option>}
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
