import PropTypes from 'prop-types';
import S from './styles.module.scss'
import { Header } from '../../components/Header/Header';


export function ProceduresSchedulingPage() {

   const dados = [
      { index: 1, patient: 'João', professional: 'Marcos', specialty:'Obstetra', value: 100, form_of_payment: 'pix', date:23 },
      { index: 2, patient: 'João', professional: 'Marcos', specialty:'Cardíaco', value: 150, form_of_payment: 'pix', date:23 },
    ];
  
  const Tabela = ({ dados }) => {
    return (
      <table className={S.table}>
        <thead>
          <tr>
            <th className={S.th_thead}>Paciente</th>
            <th className={S.th_thead}>Profissional</th>
            <th className={S.th_thead}>Especialidade</th>
            <th className={S.th_thead}>Valor</th>
            <th className={S.th_thead}>Forma de pagamento</th>
            <th className={S.th_thead}>Data</th>
          </tr>
        </thead>
        <tbody>
          {dados.map((item, index) => (
            <tr key={index}>
              <td>{item.patient}</td>
              <td>{item.professional}</td>
              <td>{item.specialty}</td>
              <td>{`R$ ${item.value}`}</td>
              <td>{item.form_of_payment}</td>
              <td>{item.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  Tabela.propTypes = {
    dados: PropTypes.arrayOf(
      PropTypes.shape({
        patient: PropTypes.string.isRequired,
        professional: PropTypes.string.isRequired,
        specialty: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired,
        date: PropTypes.string.isRequired,
      })
    ).isRequired,
  };


  return (
    <>
    <Header/>
      <div className={S.container}>
        <div className={S.divTable}>
          {dados.length > 0 ? (
            <Tabela dados={dados} />
          ) : (
            <table className={S.table}>
            <thead>
              <tr>
                <th className={S.th_thead}>Paciente</th>
                <th className={S.th_thead}>Profissional</th>
                <th className={S.th_thead}>Especialidade</th>
                <th className={S.th_thead}>Valor</th>
                <th className={S.th_thead}>Forma de pagamento</th>
                <th className={S.th_thead}>Data</th>
              </tr>
            </thead>
            <tbody>
              {dados.map((item, index) => (
                <tr key={index}>
                  <td>{item.patient}</td>
                  <td>{item.professional}</td>
                  <td>{item.specialty}</td>
                  <td>{`R$ ${item.value}`}</td>
                  <td>{item.form_of_payment}</td>
                  <td>{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
          )}
        </div>
      </div>
    </>
  );
}
