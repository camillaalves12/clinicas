import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { BiSearch } from 'react-icons/bi';
import { Form, Button } from 'react-bootstrap';
import S from './styles.module.scss'; 

export function Table() {

   const dados = [
      { index: 1, patient: 'João', professional: 'Marcos', specialty:'Obstetra', value: 100, form_of_payment: 'pix', date:23 },
      { index: 2, patient: 'João', professional: 'Marcos', specialty:'Cardíaco', value: 150, form_of_payment: 'pix', date:23 },
      { index: 3, patient: 'Maria', professional: 'Gisele', specialty:'Geral', value: 150, form_of_payment: 'pix', date:23 },
      { index: 4, patient: 'Pedro', professional: 'LAB. NATLAB', specialty:'Exame', value: 150, form_of_payment: 'pix', date:23 },
      { index: 5, patient: 'Pedro', professional: 'Antonio', specialty:'Obstetra', value: 150, form_of_payment: 'pix', date:23 },
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
      <div className={S.container}>
        <div className={S.container_search_and_create}>
          <div className={S.search_and__date}>
            <Form>
              <Form.Control
                placeholder="Pesquisar por período"
                aria-label="Search"
                style={{ outline: 'none', boxShadow: 'none', border: '1px solid #cdcdcd' }}
                type="date"
                />
            </Form>
            <Form>
              <Form.Control
                placeholder="Pesquisar por período"
                aria-label="Search"
                style={{ outline: 'none', boxShadow: 'none', border: '1px solid #cdcdcd' }}
                type="date"
              />
            </Form>
              <BiSearch className={S.iconSearch} />
            <Form className={S.search}>
              <Form.Control
                type="search"
                placeholder="Pesquisar"
                className="me-2"
                aria-label="Search"
                style={{ outline: 'none', boxShadow: 'none', border: '1px solid #cdcdcd' }}
              />
              <BiSearch className={S.iconSearch} id='habilitarBtn'/>
          </Form>
        </div>
          <div>
            <Link to="/create_consult">
              <Button variant="primary">
                + Criar nova consulta
              </Button>
            </Link>
            <Link to="/create_exam">
              <Button variant="primary" className={S.input} style={{ margin: '5px', background: '#fff', color: '#0d6efd' }}>
                + Criar novo exame
              </Button>
            </Link>
          </div>
        </div>
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
