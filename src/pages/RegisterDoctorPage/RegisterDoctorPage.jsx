import S from './styles.module.scss'
import { Header } from '../../components/Header/Header'
import React, { useState } from 'react'
import { api } from '../../services/api'
import { set } from 'zod'
import { Confirm } from '../../components/Confirm/Confirm'
import Button from 'react-bootstrap/Button';

export function RegisterDoctorPage() {
  const [modalShow, setModalShow] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    especialidade: ''
  })

  const handleInputChange = e => {
    const { name, value } = e.target

    setFormData({ ...formData, [name]: value })
  }

  const getClinicId = () => {
    const userDataString = localStorage.getItem('user')
    const userData = JSON.parse(userDataString)
    const clinicId = userData?.user?.clinicaId
    console.log(clinicId)
    return clinicId
  }

  const handleSubmit = e => {
    e.preventDefault()
    const dataToSend = { ...formData }
    const clinicId = getClinicId()
    
    console.log(dataToSend, clinicId)

    api.post(`/professional/${clinicId}`, dataToSend)
    .then(response => {
        console.log(response)
        alert('Profissional cadastrado com sucesso!')

        setFormData({
            nome: '',
            especialidade: '',
        })
    })
    .catch(error => {
        alert(error.response.data.error)
        console.log(error.response.data.error)
    })
  }

  return (
    <>
      <Header />
      <form
        id="registerDoctorForm"
        className={S.container}
        onSubmit={handleSubmit}
      >
        <div className={S.containerForm}>
          <h3 style={{ marginBottom: '1.5rem' }}>Cadastrar profissional</h3>

          <label className={S.labelForm} for="nameProfessional">
            Nome:
          </label>
          <input
            className={S.inputForm}
            type="text"
            id="nameProfessional"
            name="nome"
            onChange={handleInputChange}
            required
          />

          <label className={S.labelForm} for="specialty">
            Especialidade:
          </label>
          <input
            className={S.inputForm}
            type="text"
            id="specialty"
            name="especialidade"
            onChange={handleInputChange}
            required
          />

          <div className={S.divBtn}>
            <Button variant="primary" onClick={() => setModalShow(true)}>
              Cadastrar
            </Button>

            <Confirm
              description='Profissional registrado com sucesso!'
              show={modalShow}
              onHide={() => setModalShow(false)}
            />
          </div>
        </div>
      </form>
    </>
  )
}
