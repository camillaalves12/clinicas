import S from "./styles.module.scss";
import { useParams } from "react-router-dom";
// import { BiSearch } from "react-icons/bi";
// import { Form, Button } from "react-bootstrap";
import { Header } from "../Header/Header";
import { useEffect, useState } from "react";
import { api } from "../../services/api";

export function Details() {
  const params = useParams();
  const pacienteId = params.id;

  const [consults, setConsults] = useState([]);

  const fetchConsults = async () => {
    try {
      const response = await api.get(`/consultsForPatient/${pacienteId}`);
      setConsults(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchConsults();
  }, []);

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
      <Header />
      <div className={S.container}>
        <h3 style={{ marginBottom: "1.5rem", textAlign: "center" }}>
          Detalhes do paciente
        </h3>
        <div className={S.divTable}>
          {consults.length > 0 ? (
            <Tabela />
          ) : (
            <>
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
                  <p className={S.p}>Nenhuma consulta encontrada</p>
                </tbody>
              </table>
            </>
          )}
        </div>
      </div>
    </>
  );
}
