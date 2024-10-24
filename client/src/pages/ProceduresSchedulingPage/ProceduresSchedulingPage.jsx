/* eslint-disable no-unused-vars */
import S from "./styles.module.scss";
import { BiSearch } from "react-icons/bi";
import { Header } from "../../components/Header/Header";
import { useState, useEffect } from "react";
import { api } from "../../services/api";
import { HiCheck } from "react-icons/hi";
import { HiOutlineX } from "react-icons/hi";
import Refresh from "../../components/Refresh/Refresh";

export function ProceduresSchedulingPage() {
  const [schedulings, setSchedulings] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para o filtro de texto

  const getClinicId = () => {
    const userDataString = localStorage.getItem("user");
    const userData = JSON.parse(userDataString);
    const clinicId = userData?.user?.clinicaId;
    return clinicId;
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

  const handleCreateConsult = (scheduling) => {
    const dataToSend = {
      pacienteId: scheduling.paciente.id,
      profissionalId: scheduling.profissional.id,
      procedimentoId: scheduling.procedimento.id,
      valor_da_consulta: scheduling.valor_da_consulta,
      tipo_de_pagamento: scheduling.tipo_de_pagamento,
      clinicaId: scheduling.clinica.id,
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
      .put(`/confirmScheduling/${scheduling.id}`)
      .then((response) => {
        console.log(response);
        fetchSchedulings();
      })
      .catch((error) => {
        console.error("Erro ao processar o formulário:", error);
      });
  };

  const handleDeleteScheduling = (scheduling) => {
    api
      .delete(`/scheduling/${scheduling.id}`)
      .then((response) => {
        console.log(response);
        fetchSchedulings();
      })
      .catch((error) => {
        console.error("Erro ao processar o formulário:", error);
      });
  };

  const Tabela = () => {
    // Filtra os agendamentos com base no termo de busca
    const filteredSchedulings = schedulings.filter(scheduling => {
      const pacienteNome = scheduling.paciente.nome.toLowerCase();
      const profissionalNome = scheduling.profissional.nome.toLowerCase();
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
            <th className={S.th_thead}>Horário</th>
            <th className={S.th_thead}>Data</th>
            <th className={S.th_thead}>Criar consulta</th>
          </tr>
        </thead>
        <tbody>
          {filteredSchedulings.length > 0 ? (
            filteredSchedulings.map((scheduling) => (
              <tr key={scheduling.id}>
                <td>{scheduling.paciente.nome}</td>
                <td>{scheduling.profissional.nome}</td>
                <td>{scheduling.procedimento.nome}</td>
                <td>{`R$ ${scheduling.valor_da_consulta}`}</td>
                <td>{scheduling.hora_da_consulta}</td>
                <td>
                  {new Date(scheduling.data_da_consulta).toLocaleDateString()}
                </td>
                <td className={S.iconCheck}>
                  <HiCheck
                    style={{ width: "3rem" }}
                    onClick={() => handleCreateConsult(scheduling)}
                  />
                  <div className={S.iconCheckX}>
                    <HiOutlineX
                      onClick={() => handleDeleteScheduling(scheduling)}
                    />
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <td colSpan="6"><Refresh title="Nenhum agendamento cadastrado" /></td>
          )}
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
              <input
                type="text"
                placeholder="Pesquisar Paciente ou Profissional"
                className={S.inputSearch}
                value={searchTerm} // Atualiza o valor do input
                onChange={(e) => setSearchTerm(e.target.value)} // Atualiza o estado com o valor do input
              />
              <button type="button">
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
