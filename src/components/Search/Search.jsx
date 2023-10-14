import { useEffect, useState } from 'react'
import { api } from '../../services/api'

import S from './styles.module.scss'

export function Search(props) {
  const [searchTerm, setSearchTerm] = useState('')
  const [patients, setPatients] = useState([])
  const [showDropdown, setShowDropdown] = useState(false)
  const [selectedPatient, setSelectedPatient] = useState(null)
  const [patientId, setPatientId] = useState('')

  useEffect(() => {
    fetchPatients()
    console.log(patients)
  }, [searchTerm])

  useEffect(() => {
    if (selectedPatient) {
      setPatientId(selectedPatient.id)
    }
  }, [selectedPatient])

  useEffect(() => {
    console.log(patientId)
  }, [patientId])

  const fetchPatients = async () => {
    try {
      const response = await api.post('/patientForName', {
        nome: searchTerm
      })
      if (!response.data) {
        alert('Não existem pacientes cadastrados!')
      } else {
        setPatients(response.data)
      }
    } catch (error) {}
  }

  return (
    <div className={S.patientSearch}>
      <label className={S.labelForm} htmlFor="paciente">
        Paciente:
      </label>
      <input
        className={S.inputForm}
        type="text"
        id="paciente"
        name="paciente"
        onChange={e => {
          setSearchTerm(e.target.value)
          setShowDropdown(true)
        }}
        // onBlur={() => setShowDropdown(false)}
        value={selectedPatient ? selectedPatient.nome : searchTerm}
        autoComplete="off"
        required
      />

      <div className={S.searchDropdown}>
        <ul>
          {showDropdown && patients.length > 0 ? (
            patients.map(patient => (
              <li
                key={patient.id}
                onClick={() => {
                  setSelectedPatient(patient)
                  // setShowDropdown(false)
                  props.getPatientId(patient.id)
                }}
              >
                <div>
                  Nome: {patient.nome} | CPF: {patient.cpf}
                </div>
              </li>
            ))
          ) : (
            <> </>
          )}
        </ul>
      </div>
    </div>
  )
}
