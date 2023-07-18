import PropTypes from 'prop-types';
import { BiInfoCircle } from "react-icons/bi";
import { Link } from 'react-router-dom';
import S from './styles.module.scss'; 

export function ResultFound() {

   const dados = [
      { index: 1, nome: 'João Lucas', cpf: '123.456.789-11', data_de_nasc:'23/02/2023', telefone: 998184376},
    ];

  const Tabela = ({ dados }) => {
    return (
      <table className={S.table}>
        <thead>
          <tr>
            <th className={S.th_thead}>Nome</th>
            <th className={S.th_thead}>CPF</th>
            <th className={S.th_thead}>Data de Nascimento</th>
            <th className={S.th_thead}>Telefone</th>
            <th className={S.th_thead}>Detalhes</th>
          </tr>
        </thead>
        <tbody>
          {dados.map((item, index) => (
            <tr key={index}>
              <td>{item.nome}</td>
              <td>{item.cpf}</td>
              <td>{item.data_de_nasc}</td>
              <td>{item.telefone}</td>
              <Link to='./details'>
              <td><BiInfoCircle className={S.iconInfo}/></td>
              </Link>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  Tabela.propTypes = {
    dados: PropTypes.arrayOf(
      PropTypes.shape({
        nome: PropTypes.string.isRequired,
        cpf: PropTypes.number.isRequired,
        data_de_nasc: PropTypes.string.isRequired,
        valor: PropTypes.number.isRequired,
        data: PropTypes.string.isRequired,
      })
    ).isRequired,
  };

  return (
    <>
      <div className={S.container}>
        <div className={S.divTable}>

          {dados.length > 0 ? (
            <Tabela dados={dados} />
          ) : (
            <p>Nenhum dado disponível.</p>
          )}
        </div>
      </div>
    </>
  );
}
