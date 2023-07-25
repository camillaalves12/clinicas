import {Header} from '../../components/Header/Header';
import S from './styles.module.scss';

export function CreateExamPage() {

   const exam = [
      { id: 1, nome: 'Ultrassonografia' },
      { id: 2, nome: 'Raio X Digital' },
      { id: 3, nome: 'MAMOGRAFIA DIGITAL' },
      { id: 4, nome: 'Densitometria Óssea' },
      { id: 5, nome: 'Tomografia computadorizada' },
      { id: 6, nome: 'Endoscopia digestiva alta' },
      { id: 7, nome: 'PAAF' },
      { id: 8, nome: 'Exames ginecológicos (preventivo, colposcopia, biópsia do colo uterino)' }
    ];

   return(
      <>
      <Header/>
      <div className={S.pageCreateConsult}>
         <div className={S.forms}>
         <form id="consultaForm" className={S.container}>
          <div className={S.containerForm}>
            <h3 style={{ marginBottom: '1.5rem' }}>Criar Exame</h3>

              <label className={S.labelForm} for="paciente">Paciente:</label>
              <input className={S.inputForm} type="text" id="paciente" required/>

            <div className={S.divForms}>

              <div>
              <label className={S.labelForm} for="profissional">Profissional:</label>
              <input className={S.inputForm} style={{width:'255px'}} type="text" id="profissional" required/>

              </div>

              <div>
                <label className={S.labelForm} for='procedure'>Exame:</label>
                <select className={S.inputForm} style={{width:'255px'}}>
                  <option>Selecione o exame</option>
                    {exam.map((exam) => (
                      <option key={exam.id} value={exam.id}>
                        {exam.nome}
                      </option>
                    ))}
                </select>

              </div>

            </div>

            <div className={S.divForms}>

                <div>
                  <label className={S.labelForm} for="valor">Valor:</label>
                  <input className={S.inputForm}  style={{width:'235px'}} type="text" id="valor" step="0.01" required/>
                </div>

                <div>
                  <label className={S.labelForm}>Forma de Pagamento:</label>
                  <select className={S.inputForm} style={{width:'275px'}} >
                    <option option='Selecione a forma de pagamento'>Selecione a forma de pagamento</option>
                    <option option="Dinheiro">Dinheiro</option>
                    <option option="Cartão de Crédito">Cartão de Crédito</option>
                    <option option="Cartão de Débito">Cartão de Débito</option>
                    <option option="Cheque">Pix</option>
                  </select>
                </div>

            </div>

            <div className={S.divBtn}>
              <input className={S.btn} type="submit" option="Enviar"/>
            </div>
          </div>
        </form>
         </div>
      </div>
      </>
   )
}