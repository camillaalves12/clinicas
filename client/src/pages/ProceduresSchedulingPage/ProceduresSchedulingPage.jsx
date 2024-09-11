/* eslint-disable no-unused-vars */
import S from "./styles.module.scss";
import PropTypes from "prop-types";
import { BiSearch } from "react-icons/bi";
import { Form, Button } from "react-bootstrap";
import { Header } from "../../components/Header/Header";
import { useState, useEffect } from "react";
import { api } from "../../services/api";
import { HiCheck } from "react-icons/hi";
import { HiOutlineX } from "react-icons/hi";
import Refresh from "../../components/Refresh/Refresh";
import Spinner from "react-bootstrap/Spinner";

export function ProceduresSchedulingPage() {
  const [schedulings, setSchedulings] = useState([]);
  const [date, setDate] = useState("");
  const [professional, setProfessional] = useState("");

  const getClinicId = () => {
    const userDataString = localStorage.getItem("user");
    const userData = JSON.parse(userDataString);
    const clinicId = userData?.user?.clinicaId;
    return clinicId;
  };

  const handleDateSubmit = () => {
    const dataToSend = {
      data: date,
    };

    api
      .put(`/schedulingsForDate`, dataToSend)
      .then((response) => {
        setSchedulings(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDailySchedules = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;

    const dataToSend = {
      data: formattedDate,
    };

    api
      .put(`/schedulingsForDate`, dataToSend)
      .then((response) => {
        setSchedulings(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchSchedulings = async () => {
    try {
      const response = await api.get("/upcomingSchedulings");
      setSchedulings(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSchedulings();
  }, []);

  const handleCreateConsult = (schedulings) => {
    const dataToSend = {
      pacienteId: schedulings.paciente.id,
      profissionalId: schedulings.profissional.id,
      procedimentoId: schedulings.procedimento.id,
      valor_da_consulta: schedulings.valor_da_consulta,
      tipo_de_pagamento: schedulings.tipo_de_pagamento,
      clinicaId: schedulings.clinica.id,
    };

    api
      .post(`/consult/${getClinicId()}`, dataToSend)
      .then((response) => {
        alert("Consulta criada com sucesso!");
        console.log(response);
      })
      .catch((error) => {
        console.error("Erro ao processar o formulário:", error);
      });

    api
      .put(`/confirmScheduling/${schedulings.id}`)
      .then((response) => {
        console.log(response);
        fetchSchedulings();
      })
      .catch((error) => {
        console.error("Erro ao processar o formulário:", error);
      });
  };

  const handleDeleteScheduling = (schedulings) => {
    api
      .delete(`/scheduling/${schedulings.id}`)
      .then((response) => {
        console.log(response);
        fetchSchedulings();
      })
      .catch((error) => {
        console.error("Erro ao processar o formulário:", error);
      });
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
            <th className={S.th_thead}>Horário</th>
            <th className={S.th_thead}>Data</th>
            <th className={S.th_thead}>Criar consulta</th>
          </tr>
        </thead>
        <tbody>
          {schedulings.map((schedulings) => (
            <tr key={schedulings.id}>
              <td>{schedulings.paciente.nome}</td>
              <td>{schedulings.profissional.nome}</td>
              <td>{schedulings.procedimento.nome}</td>
              <td>{`R$ ${schedulings.valor_da_consulta}`}</td>
              <td>{schedulings.hora_da_consulta}</td>
              <td>
                {new Date(schedulings.data_da_consulta).toLocaleDateString()}
              </td>

              <td className={S.iconCheck}>
                <HiCheck
                  style={{ width: "3rem" }}
                  onClick={() => handleCreateConsult(schedulings)}
                />
                <div className={S.iconCheckX}>
                  <HiOutlineX
                    onClick={() => handleDeleteScheduling(schedulings)}
                  />
                </div>
              </td>
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
        <h2>Agendamentos</h2>
        <div className={S.container_search_and_create}>
          <div className={S.search_and__date}>
            <form className={S.searchDate}>
              <button
                className={S.btnHoje}
                type="button"
                onClick={() => handleDailySchedules()}
              >
                Hoje
              </button>
              <input
                type="date"
                name="date"
                className={S.inputDate}
                onChange={(e) => setDate(e.target.value)}
              />
              <button type="button" onClick={() => handleDateSubmit()}>
                <BiSearch className={S.iconSearch} />
              </button>
            </form>
          </div>
        </div>
        <div className={S.divTable}>
          {schedulings.length > 0 ? (
            <Tabela />
          ) : (
            <Refresh title="Nenhum agendamento encontrado" />
          )}
        </div>
      </div>
    </>
  );
}
