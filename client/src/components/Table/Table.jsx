
import { Link } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
import { Form, Button } from "react-bootstrap";
import S from "./styles.module.scss";
import { useState, useEffect } from "react";
import { api } from "../../services/api";
import Refresh from "../Refresh/Refresh";

export function Table() {
  const [consults, setConsults] = useState([]);
  const [initialDate, setInitialDate] = useState("");
  const [finalDate, setFinalDate] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); // Novo estado para o filtro de texto

  useEffect(() => {
    fetchConsults();
  }, []);

  const fetchConsults = async () => {
    try {
      const response = await api.get("/consults");
      setConsults(response.data);
    } catch (error) {
      console.log("Erro ao tentar consultar as consultas:", error);
    }
  };

  const handleDateSubmit = async (e) => {
    e.preventDefault();
    console.log("Initial Date:", initialDate);
    console.log("Final Date:", finalDate);

    if (!initialDate || !finalDate) {
      console.log("Datas inválidas fornecidas");
      return;
    }

    try {
      const clinicId = getClinicId();
      const response = await api.post(`/consultForPeriod/${clinicId}`, {
        data_inicial: initialDate,
        data_final: finalDate,
      });

      const data = response.data;

      const sortedData = data.sort((a, b) => new Date(b.data_de_criacao) - new Date(a.data_de_criacao));

      console.log("Consultas por período recebidas:", sortedData);
      setConsults(sortedData);
    } catch (error) {
      console.log("Erro ao buscar consultas por período:", error);
    }
  };

  const getClinicId = () => {
    const userDataString = localStorage.getItem("user");
    const userData = JSON.parse(userDataString);
    const clinicId = userData?.user?.clinicaId;
    return clinicId;
  };

  const Tabela = () => {
    // Filtra as consultas com base no termo de busca
    const filteredConsults = consults.filter(consult => {
      const pacienteNome = consult.paciente.nome.toLowerCase();
      const profissionalNome = consult.profissional.nome.toLowerCase();
      return (
        pacienteNome.includes(searchTerm.toLowerCase()) || 
        profissionalNome.includes(searchTerm.toLowerCase())
      );
    });

    return (
      <table className={S.table}>
        <thead>
          <tr>
            <th className={S.th_thead}>Paciente</th>
            <th className={S.th_thead}>Profissional</th>
            <th className={S.th_thead}>Procedimento</th>
            <th className={S.th_thead}>Valor</th>
            <th className={S.th_thead}>Forma de pagamento</th>
            <th className={S.th_thead}>Data</th>
          </tr>
        </thead>
        <tbody>
          {filteredConsults.length > 0 ? (
            filteredConsults.map((consult) => (
              <tr key={consult.id}>
                <td>{consult.paciente.nome}</td>
                <td>{consult.profissional.nome}</td>
                <td>{consult.procedimento.nome}</td>
                <td>{`R$ ${consult.valor_da_consulta}`}</td>
                <td>{consult.tipo_de_pagamento}</td>
                <td>{new Date(consult.data_de_criacao).toLocaleDateString()}</td>
              </tr>
            ))
          ) : (
              <td colSpan="6"><Refresh title="Nenhuma consulta cadastrada" /></td>
          )}
        </tbody>
      </table>
    );
  };

  return (
    <>
      <div className={S.container}>
        <div className={S.container_search_and_create}>
          <div className={S.search_and__date}>
            <form className={S.searchDate} onSubmit={handleDateSubmit}>
              <input
                type="date"
                name="initialDate"
                value={initialDate}
                onChange={(e) => setInitialDate(e.target.value)}
                className={S.inputDate}
              />
              <input
                type="date"
                name="finalDate"
                value={finalDate}
                onChange={(e) => setFinalDate(e.target.value)}
                className={S.inputDate}
              />
              <button type="submit">
                <BiSearch className={S.iconSearch} />
              </button>
              <Form className={S.search}>
                <Form.Control
                  type="search"
                  placeholder="Pesquisar Paciente ou Profissional"
                  className="me-2"
                  aria-label="Search"
                  style={{
                    outline: "none",
                    boxShadow: "none",
                    border: "1px solid #cdcdcd",
                  }}
                  value={searchTerm} // Atualiza o valor do input
                  onChange={(e) => setSearchTerm(e.target.value)} // Atualiza o estado com o valor do input
                />
                <button>
                  <BiSearch className={S.iconSearch} />
                </button>
              </Form>
            </form>
          </div>
          <div className={S.divCreates}>
            <Link to="/create_consult">
              <Button variant="primary">+ Criar nova consulta</Button>
            </Link>
            <Link to="/create_exam">
              <Button
                variant="primary"
                className={S.input}
                style={{ background: "#fff", color: "#0d6efd" }}
              >
                + Criar novo exame
              </Button>
            </Link>
          </div>
        </div>
        <div className={S.divTable}>
          {consults.length > 0 ? (
            <Tabela />
          ) : (
            <Refresh title="Nenhuma consulta cadastrada" />
          )}
        </div>
      </div>
    </>
  );
}
