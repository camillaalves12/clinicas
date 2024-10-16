/* eslint-disable react/prop-types */
import PropTypes from "prop-types";
import { BiInfoCircle } from "react-icons/bi"; // Importar o ícone se necessário
import { HiOutlineDocumentReport } from "react-icons/hi";
import S from "./styles.module.scss";
import { Link } from "react-router-dom";
import generatePDF from "../../pages/GeneratePDF/GeneratePDF";

export function ResultFound({ dados, showFullDetails = true,  }) {
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
            ) : (
              <>
              <th className={S.th_thead}>Especialidade</th>
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
              ) : (
                <>
                <td>{item.cargo}</td>
                <td>
                <HiOutlineDocumentReport
                  className={S.iconInfo}
                  onClick={() => generatePDF(item.id)} // Chama a função ao clicar no ícone
                  style={{ cursor: 'pointer', color:'blue' }} // Adiciona um cursor para mostrar que é clicável
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
        {dados.length > 0 ? <Tabela dados={dados} /> : <p>Nenhum dado disponível.</p>}
      </div>
    </div>
  );
}

ResultFound.propTypes = {
  dados: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      cargo: PropTypes.string,
      cpf: PropTypes.string,
      data_de_nascimento: PropTypes.string,
      telefone: PropTypes.string,
    })
  ).isRequired,
  showFullDetails: PropTypes.bool,
};
