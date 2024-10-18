/* eslint-disable no-unused-vars */
import { Header } from "../../components/Header/Header";
import { useState } from "react";
import S from "./styles.module.scss";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { api } from "../../services/api";
import { ResultFound } from "../../components/ResultFound/ResultFound";
import { Negative } from "../../components/Negative/Negative";
import Modal from "react-bootstrap/Modal";

export function Reports(props) {
  const [nameOrCPF, setNameOrCPF] = useState("");
  const [searchRoute, setSearchRoute] = useState("");
  const [patients, setPatients] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(); // Estado para o mês

  const normalizeString = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  const handleSearch = async (event) => {
    event.preventDefault();
  
    try {
      setPatients([]);
      setShowResults(false);
  
      let response;
  
      const normalizedSearchTerm = normalizeString(nameOrCPF);
  
      switch (searchRoute) {
        case "professional":
          response = await api.post("/professionalForName", {
            nome: normalizedSearchTerm,
          });
          break;
  
        case "clinic":
          response = await api.post("/clinicForName", {
            nome: normalizedSearchTerm,
          });
          break;
  
        default:
          console.log("Rota de pesquisa inválida");
          return;
      }
  
      if (response.data) {
        if (searchRoute === "clinic" && response.data.id) {
          setPatients([response.data]);
          setShowResults(true);
        } else if (searchRoute === "professional" && response.data.length > 0) {
          setPatients(response.data);
          setShowResults(true);
        } else {
          setModalShow(true);
        }
      } else {
        setModalShow(true);
      }
    } catch (error) {
      console.error("Erro ao buscar pacientes ou clínicas:", error);
      setModalShow(true);
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
          <h2 style={{ marginBottom: "1.5rem" }}>Relatório</h2>

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
              <option value="clinic">Clínica</option>
              <option value="professional">Profissional</option>
            </Form.Select>
          </Form.Group>

          {searchRoute === "clinic" || searchRoute === "professional" ? (
            <>
              <Form.Group className="mb-3" id="inputNameCPF">
                <Form.Label>
                  {searchRoute === "clinic" ? "Nome da Clínica:" : "Nome do Profissional:"}
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

              {/* Input para selecionar o mês */}
              <Form.Group className="mb-3" id="selectMonth">
                <Form.Label>Selecione o mês:</Form.Label>
                <Form.Select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  style={{
                    outline: "none",
                    boxShadow: "none",
                    border: "1px solid #cdcdcd",
                  }}
                >
                  <option value="">Selecione uma opção</option>
                  <option value="01">Janeiro</option>
                  <option value="02">Fevereiro</option>
                  <option value="03">Março</option>
                  <option value="04">Abril</option>
                  <option value="05">Maio</option>
                  <option value="06">Junho</option>
                  <option value="07">Julho</option>
                  <option value="08">Agosto</option>
                  <option value="09">Setembro</option>
                  <option value="10">Outubro</option>
                  <option value="11">Novembro</option>
                  <option value="12">Dezembro</option>
                </Form.Select>
              </Form.Group>
            </>
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

      <Modal show={showResults} onHide={() => setShowResults(false)} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>Resultados da Busca</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {patients.length > 0 ? (
            <ResultFound 
              dados={patients} 
              showFullDetails={false} 
              type={searchRoute} 
              selectedMonth={selectedMonth} // Passa o mês selecionado para o componente ResultFound
            />
          ) : (
            <p>Nenhum dado disponível.</p>
          )}
        </Modal.Body>
      </Modal>

      <Negative
        title={searchRoute === "clinic" ? "Clínica não encontrada!" : "Profissional não encontrado!"}
        description={searchRoute === "clinic" ? "Cadastre a clínica e tente novamente." : "Cadastre o profissional e tente novamente."}
        show={modalShow}
        onHide={handleCloseModal}
      />
    </>
  );
}
