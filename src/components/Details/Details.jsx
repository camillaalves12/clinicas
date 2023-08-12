import S from './styles.module.scss'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { BiSearch } from 'react-icons/bi';
import { Form, Button } from 'react-bootstrap';
import { Header } from '../Header/Header';

export function Details() {
    const dados = [
        { index: 1, patient: 'João', professional: 'Marcos', procedure_group:'UILTRASSONOGRAFIA', procedures: 'USG DA COXA', value: 150, form_of_payment: 'pix', date:'12/08/2022' },
        { index: 2, patient: 'João', professional: 'Marcos', procedure_group:'UILTRASSONOGRAFIA', procedures: 'USG DO OMBRO', value: 150, form_of_payment: 'Cartão de crédito', date:23 },
        { index: 3, patient: 'João', professional: 'Gisele', procedure_group:'Obtetra', procedures: 'blabkabka', value: 150, form_of_payment: 'pix', date: '23/01/2002'},
        { index: 4, patient: 'João', professional: 'Antonio', procedure_group:'Obtetra', procedures: 'blabkabka', value: 150, form_of_payment: 'pix', date:23 },
        { index: 5, patient: 'João', professional: 'Antonio', procedure_group:'Obtetra', procedures: 'blabkabka', value: 150, form_of_payment: 'pix', date:23 },
        { index: 5, patient: 'João', professional: 'Antonio', procedure_group:'Obtetra', procedures: 'blabkabka', value: 150, form_of_payment: 'pix', date:23 },
        { index: 5, patient: 'João', professional: 'Antonio', procedure_group:'Obtetra', procedures: 'blabkabka', value: 150, form_of_payment: 'pix', date:23 },
        { index: 5, patient: 'João', professional: 'Antonio', procedure_group:'Obtetra', procedures: 'blabkabka', value: 150, form_of_payment: 'pix', date:23 },
        { index: 6, patient: 'João', professional: 'Antonio', procedure_group:'Obtetra', procedures: 'blabkabka', value: 150, form_of_payment: 'pix', date:23 },
        { index: 6, patient: 'João', professional: 'Antonio', procedure_group:'Obtetra', procedures: 'blabkabka', value: 150, form_of_payment: 'pix', date:23 },
        { index: 6, patient: 'João', professional: 'Antonio', procedure_group:'Obtetra', procedures: 'blabkabka', value: 150, form_of_payment: 'pix', date:23 },
      ];

      const Tabela = ({ dados }) => {
          return (
            <table className={S.table}>
              <thead>
                <tr>
                  <th className={S.th_thead}>Paciente</th>
                  <th className={S.th_thead}>Profissional</th>
                  <th className={S.th_thead}>Grupo de procedimento</th>
                  <th className={S.th_thead}>Procedimento</th>
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
                    <td>{item.procedure_group}</td>
                    <td>{item.procedures}</td>
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
              procedure_group: PropTypes.string.isRequired,
              procedures: PropTypes.string.isRequired,
              value: PropTypes.string.isRequired,
              form_of_payment:PropTypes.string.isRequired,
              date: PropTypes.number.isRequired,
            })
          ).isRequired,
        };

        return (
          <>
          <Header />
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
                        <th className={S.th_thead}>Grupo de procedimento</th>
                        <th className={S.th_thead}>Procedimento</th>
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
                          <td>{item.procedure_group}</td>
                          <td>{item.procedures}</td>
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