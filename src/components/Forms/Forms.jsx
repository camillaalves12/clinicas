import S from './styles.module.scss';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import ButtonCase from '../ButtonCase/ButtonCase';

export function Forms(props) {
  const [procedureSelecionado, setProcedureSelecionado] = useState("");
  const handleProcedureChange = (e) => {
    setProcedureSelecionado(e.target.value);
  };

  return (
    <Form className={S.container}>
      <div className={S.containerForm}>
        <h2 style={{ marginBottom: '1.5rem' }}>{props.title}</h2>
        <Form.Group className="mb-3" controlId={props.controlIdFirst}>
          <Form.Label>Paciente:</Form.Label>
          <Form.Control
            type="text"
            style={{ outline: 'none', boxShadow: 'none', border: '1px solid #cdcdcd' }}
          />
        </Form.Group>

        <div className={S.doctor}>
          <Form.Group className="mb-3" controlId={props.controlIdSecond}>
            <Form.Label>Profissional:</Form.Label>
            <Form.Control
              className={S.inputDoctor}
              type="text"
              style={{ outline: 'none', boxShadow: 'none', border: '1px solid #cdcdcd' }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId={props.controlIdFThird}>
            <Form.Label>{props.labelProcedure}</Form.Label>
            <Form.Select
              style={{ outline: 'none', boxShadow: 'none', border: '1px solid #cdcdcd' }}
              value={procedureSelecionado}
              onChange={handleProcedureChange}
              className={S.inputDoctorEspc}
            >
              <option>{props.placeholderProcedure}</option>
              {props.procedures.map((procedure) => (
                <option key={procedure.id} value={procedure.id}>
                  {procedure.nome}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

        </div>

        <div className={S.money}>
          <Form.Group className="mb-3" controlId={props.controlIdfourth}>
            <Form.Label>Valor:</Form.Label>
            <Form.Control
              type="medico"
              className={S.inputMoney}
              style={{ outline: 'none', boxShadow: 'none', border: '1px solid #cdcdcd' }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId={props.controlIdControlIdFifth}>
            <Form.Label>Forma de Pagamento:</Form.Label>
            <Form.Select style={{ outline: 'none', boxShadow: 'none', border: '1px solid #cdcdcd' }}>
              <option>Selecione a forma de pagamento</option>
              <option value="1">Pix</option>
              <option value="2">Cartão de Débito</option>
              <option value="3">Cartão de Crédito</option>
              <option value="4">Dinheiro</option>
              <option value="5">Outro</option>
            </Form.Select>
          </Form.Group>

        </div>
        <ButtonCase nameBtn="Cadastrar" title="Consulta Cadastrada" className={S.btnCase} />
      </div>
    </Form>
  );
}
