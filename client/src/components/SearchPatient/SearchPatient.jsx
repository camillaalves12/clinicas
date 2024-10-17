/* eslint-disable react/prop-types */
import { useState } from "react";
import S from "./styles.module.scss";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { ResultFound } from "../ResultFound/ResultFound";
import { api } from "../../services/api";
import { Negative } from "../Negative/Negative";
import Modal from "react-bootstrap/Modal";

export function SearchPatient({title}) {
  const [nameOrCPF, setNameOrCPF] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [searchRoute, setSearchRoute] = useState("");
  const [patients, setPatients] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [showResults, setShowResults] = useState(false); // Controla a exibição do modal de resultados

  // Função para normalizar strings
  const normalizeString = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  const handleSearch = async (event) => {
    event.preventDefault(); 

    try {
      // Limpar resultados de pesquisa anteriores
      setPatients([]);
      setShowResults(false);

      let response;

      // Normalizar a entrada do usuário
      const normalizedSearchTerm = normalizeString(nameOrCPF);

      switch (searchRoute) {
        case "name":
          response = await api.post("/patientForName", { nome: normalizedSearchTerm });
          break;
        case "dateOfBirth":
          response = await api.post("/patientForDateOfBirth", {
            data_de_nascimento: dateOfBirth,
          });
          break;
        case "cpf":
          response = await api.post("/patientForCPF", { cpf: normalizedSearchTerm });
          break;
        default:
          return; 
      }

      // Verificar se há resultados
      if (response.data && response.data.length > 0) {
        setPatients(response.data);
        setShowResults(true); // Exibir resultados se houver dados
      } else {
        setModalShow(true); // Exibir modal de erro se não houver dados
      }
    } catch (error) {
      console.error("Erro ao buscar pacientes:", error);
      setModalShow(true); // Exibir modal de erro em caso de exceção
    }
  };

  const handleCloseModal = () => {
    setModalShow(false);
  };

  return (
    <>
      <Form className={S.container} onSubmit={handleSearch}>
        <div className={S.containerForm}>
          <h2 style={{ marginBottom: "1.5rem" }}>{title}</h2>
          <Form.Group className="mb-3" id="searchRoute">
            <Form.Label>Buscar por:</Form.Label>
            <Form.Select
              value={searchRoute}
              onChange={(e) => setSearchRoute(e.target.value)}
              style={{
                outline: "none",
                boxShadow: "none",
                border: "1px solid #cdcdcd",
              }}
            >
              <option value="">Selecione uma opção</option>
              <option value="name">Nome</option>
              <option value="dateOfBirth">Data de Nascimento</option>
              <option value="cpf">CPF</option>
            </Form.Select>
          </Form.Group>

          {searchRoute === "name" || searchRoute === "cpf" ? (
            <Form.Group className="mb-3" id="inputNameCPF">
              <Form.Label>
                {searchRoute === "name" ? "Nome:" : "CPF:"}
              </Form.Label>
              <Form.Control
                required
                type="text"
                style={{
                  outline: "none",
                  boxShadow: "none",
                  border: "1px solid #cdcdcd",
                }}
                value={nameOrCPF}
                onChange={(e) => setNameOrCPF(e.target.value)}
              />
            </Form.Group>
          ) : null}

          {searchRoute === "dateOfBirth" ? (
            <Form.Group className="mb-3" id="inputDateNasc">
              <Form.Label>Data de nascimento:</Form.Label>
              <Form.Control
                required
                className={S.inputDoctor}
                type="date"
                style={{
                  outline: "none",
                  boxShadow: "none",
                  border: "1px solid #cdcdcd",
                }}
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
              />
            </Form.Group>
          ) : null}

          <div className={S.btnSearch}>
            <Button
              type="submit"
              style={{ width: "250px", height: "38px", textAlign: "center" }}
            >
              Procurar
            </Button>
          </div>
        </div>
      </Form>

      {/* Modal de Resultados */}
      <Modal show={showResults} onHide={() => setShowResults(false)} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>Resultados da Busca</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {patients.length > 0 ? (
            <ResultFound dados={patients} showFullDetails={true} />
          ) : (
            <p>Nenhum dado disponível.</p>
          )}
        </Modal.Body>
      </Modal>

      {/* Modal de Confirmação (Erro) */}
      <Negative
        title="Paciente não encontrado!"
        description="Cadastre o paciente e tente novamente."
        show={modalShow}
        onHide={handleCloseModal}
      />
    </>
  );
}
