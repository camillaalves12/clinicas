import { useEffect, useState } from "react";
import { api } from "../../services/api";
import S from "./styles.module.scss";
import { Link } from "react-router-dom";
import { BiInfoCircle } from "react-icons/bi";

export function Search(props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [patients, setPatients] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [patientId, setPatientId] = useState("");

  useEffect(() => {
    fetchPatients();
  }, [searchTerm]);

  useEffect(() => {
    if (selectedPatient) {
      setPatientId(selectedPatient.id);
    }
  }, [selectedPatient]);

  const fetchPatients = async () => {
    try {
      const response = await api.post("/patientForName", {
        nome: searchTerm,
      });
      if (!response.data) {
        alert("Não existem pacientes cadastrados!");
      } else {
        setPatients(response.data);
      }
    } catch (error) {}
  };

  const dropdownExibition = () => {
    if (showDropdown) {
      return { display: "flex" };
    } else {
      return { display: "none" };
    }
  };

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
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setShowDropdown(true);
        }}
        value={searchTerm}
        autoComplete="off"
        required
      />

      <div className={S.searchDropdown} style={dropdownExibition()}>
        <ul>
          {patients.length > 0 ? (
            patients.map((patient) => (
              <li
                key={patient.id}
                onClick={() => {
                  setSelectedPatient(patient);
                  setSearchTerm(patient.nome);
                  props.getPatientId(patient.id);
                  setShowDropdown(false);
                }}
              >
                <div className={S.patientData}>
                  <p className={S.patientName}>Nome: {patient.nome}</p>
                  <p className={S.patientCPF}>CPF: {patient.cpf}</p>
                  <p className={S.patientAge}>
                    Data de Nascimento: {patient.data_de_nascimento}
                  </p>
                  <p className={S.patientTel}>Telefone: {patient.telefone}</p>
                  <Link to={`/search_patient/details/${patient.id}`}>
                    <p>
                      <BiInfoCircle className={S.iconInfo} />
                    </p>
                  </Link>
                </div>
              </li>
            ))
          ) : (
            <div>
              <li>Nenhum paciente encontrado</li>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
}
