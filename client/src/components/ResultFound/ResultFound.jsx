import PropTypes from "prop-types";
import { BiInfoCircle } from "react-icons/bi"; 
import { HiOutlineDocumentReport } from "react-icons/hi";
import S from "./styles.module.scss";
import { Link } from "react-router-dom";
import generatePDF from "../../pages/GeneratePDF/GeneratePDF";

export function ResultFound({ dados, showFullDetails = true, type, selectedMonth }) {
  const Tabela = ({ dados }) => {
    return (
      <table className={S.table}>
        <thead>
          <tr>
            <th className={S.th_thead}>Nome</th>
            {showFullDetails ? (
              <>
                <th className={S.th_thead}>CPF</th>
                <th className={S.th_thead}>Data de Nascimento</th>
                <th className={S.th_thead}>Telefone</th>
                <th className={S.th_thead}>Detalhes</th>
              </>
            ) : type === "professional" ? (
              <>
                <th className={S.th_thead}>Especialidade</th>
                <th className={S.th_thead}>Gerar relatório</th>
              </>
            ) : (
              <>
                <th className={S.th_thead}>Gerar relatório</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {dados.map((item) => (
            <tr key={item.id}>
              <td>{item.nome}</td>
              {showFullDetails ? (
                <>
                  <td>{item.cpf}</td>
                  <td>{item.data_de_nascimento}</td>
                  <td>{item.telefone}</td>
                  <td>
                    <Link to={`./details/${item.id}`}>
                      <BiInfoCircle className={S.iconInfo} />
                    </Link>
                  </td>
                </>
              ) : type === "professional" ? (
                <>
                  <td>{item.cargo}</td>
                  <td>
                    <HiOutlineDocumentReport
                      className={S.iconInfo}
                      onClick={() => generatePDF(item.id, false, selectedMonth)} 
                      style={{ cursor: "pointer", color: "blue" }}
                    />
                  </td>
                </>
              ) : (
                <>
                  <td>
                    <HiOutlineDocumentReport
                      className={S.iconInfo}
                      onClick={() => generatePDF(item.id, true, selectedMonth)}
                      style={{ cursor: "pointer", color: "blue" }}
                    />
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className={S.container}>
      <div className={S.divTable}>
        {dados.length > 0 ? (
          <Tabela dados={dados} />
        ) : (
          <p>Nenhum dado disponível.</p>
        )}
      </div>
    </div>
  );
}

ResultFound.propTypes = {
  dados: PropTypes.arrayOf(
    PropTypes.shape({
      nome: PropTypes.string.isRequired,
      cargo: PropTypes.string,
      cpf: PropTypes.string,
      data_de_nascimento: PropTypes.string,
      telefone: PropTypes.string,
    })
  ).isRequired,
  showFullDetails: PropTypes.bool,
  type: PropTypes.oneOf(["professional", "clinic"]).isRequired,
  selectedMonth: PropTypes.string.isRequired,  // Adicionando o mês como prop
};
