// import PropTypes from 'prop-types'
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
      const response = await api.get(`/consultForPeriod/${clinicId}`, {
        initialDate,
        finalDate,
      });
      const data = response.data;

      console.log("Consultas por período recebidas:", data);

      setConsults(data);
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
          {consults.map((consults) => (
            <tr key={consults.id}>
              <td>{consults.paciente.nome}</td>
              <td>{consults.profissional.nome}</td>
              <td>{consults.procedimento.nome}</td>
              <td>{`R$ ${consults.valor_da_consulta}`}</td>
              <td>{consults.tipo_de_pagamento}</td>
              <td>{new Date(consults.data_de_criacao).toLocaleDateString()}</td>
            </tr>
          ))}
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
                  placeholder="Pesquisar"
                  className="me-2"
                  aria-label="Search"
                  style={{
                    outline: "none",
                    boxShadow: "none",
                    border: "1px solid #cdcdcd",
                  }}
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
