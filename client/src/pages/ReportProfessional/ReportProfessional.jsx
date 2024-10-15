/* eslint-disable no-unused-vars */
import { Header } from "../../components/Header/Header";
import { useState } from "react";
import S from "./styles.module.scss";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { api } from "../../services/api";
import { ResultFound } from "../../components/ResultFound/ResultFound";
import { Confirm } from "../../components/Confirm/Confirm";
import Modal from "react-bootstrap/Modal";

export function ReportProfessional(props) {
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

      console.log("Rota de pesquisa:", searchRoute);
      console.log("Dados de pesquisa:", { normalizedSearchTerm, dateOfBirth });

      switch (searchRoute) {
        case "name":
          response = await api.post("/professionalForName", {
            nome: normalizedSearchTerm,
          });
          break;
        case "dateOfBirth":
          response = await api.post("/patientForDateOfBirth", {
            data_de_nasc: dateOfBirth,
          });
          break;
        case "cpf":
          response = await api.post("/patientForCPF", { cpf: normalizedSearchTerm });
          break;
        default:
          console.log("Rota de pesquisa inválida");
          return; // Se nenhuma rota válida foi selecionada, não faz nada
      }

      console.log("Resposta da API:", response);

      // O resultado da API será um array de pacientes correspondentes
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
      <Header />
      <Form className={S.container} onSubmit={handleSearch}>
        <div className={S.containerForm}>
          <h2 style={{ marginBottom: "1.5rem" }}>Relatório por profissional</h2>
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
            <ResultFound dados={patients} showFullDetails={false} />
          ) : (
            <p>Nenhum dado disponível.</p>
          )}
        </Modal.Body>
      </Modal>

      {/* Modal de Confirmação (Erro) */}
      <Confirm
        title="Profissional não encontrado!"
        description="Cadastre o profissional e tente novamente."
        show={modalShow}
        onHide={handleCloseModal}
      />
    </>
  );
}
