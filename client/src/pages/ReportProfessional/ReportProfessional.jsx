/* eslint-disable no-unused-vars */
import { Header } from "../../components/Header/Header";
import { useState } from "react";
import S from "./styles.module.scss";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { api } from "../../services/api";

import { ResultFound } from "../../components/ResultFound/ResultFound";
// import { ResultNotFound } from '../../components/ResultNotFound/ResultNotFound';
import { Confirm } from "../../components/Confirm/Confirm";

export function ReportProfessional(props) {
  const [nameOrCPF, setNameOrCPF] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [searchRoute, setSearchRoute] = useState("");
  const [patients, setPatients] = useState([]);
  const [modalShow, setModalShow] = useState(false);

  const handleSearch = async (event) => {
    event.preventDefault();

    try {
      setPatients([]);

      let response;

      console.log("Rota de pesquisa:", searchRoute);
      console.log("Dados de pesquisa:", { nameOrCPF, dateOfBirth });

      switch (searchRoute) {
        case "name":
          response = await api.post("/professionalForName", {
            nome: nameOrCPF,
          });
          break;
        case "dateOfBirth":
          response = await api.post("/patientForDateOfBirth", {
            data_de_nasc: dateOfBirth,
          });
          break;
        case "cpf":
          response = await api.post("/patientForCPF", { cpf: nameOrCPF });
          break;
        default:
          console.log("Rota de pesquisa inválida");
          return; // Se nenhuma rota válida foi selecionada, não faz nada
      }

      console.log("Resposta da API:", response);

      // O resultado da API será um array de pacientes correspondentes
      setPatients(response.data);
    } catch (error) {
      console.error("Erro ao buscar pacientes:", error);
      if (error.response) {
        console.error("Dados do erro:", error.response.data);
      }
    }
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

      {patients.length > 0 ? (
        <ResultFound dados={patients} />
      ) : (
        <Confirm
          title="Profissional não encontrado!"
          description="Tente novamente"
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      )}
    </>
  );
}
