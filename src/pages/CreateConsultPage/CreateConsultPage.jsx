import {Header} from '../../components/Header/Header'
import S from './styles.module.scss'

export function CreateConsultPage() {

   const procedures = [
      { id: 1, nome: 'Oftalmologista' },
      { id: 2, nome: 'Ortopedista' },
      { id: 3, nome: 'Otorrinolaringologista' },
      { id: 4, nome: 'Dermatologista' },
      { id: 5, nome: 'Urologista' },
      { id: 6, nome: 'Geriatra' },
      { id: 7, nome: 'Médico do trabalho' },
      { id: 8, nome: 'Psiquiatra' },
      { id: 9, nome: 'Gastroenterologista' },
      { id: 10, nome: 'Clínico geral' },
      { id: 11, nome: 'Cirurgião' },
      { id: 12, nome: 'Mastologista' }
    ];
   return(
      <>
      <Header/>
      <div className={S.pageCreateConsult}>
         <div className={S.forms}>
            <form id="consultaForm" className={S.container}>
            <div className={S.containerForm}>
               <h3 style={{ marginBottom: '1.5rem' }}>Criar Consulta</h3>

               <label className={S.labelForm} for="paciente">Paciente:</label>
               <input className={S.inputForm} type="text" id="paciente" required/>

               <div className={S.divForms}>

               <div>
               <label className={S.labelForm} for="profissional">Profissional:</label>
               <input className={S.inputForm} style={{width:'255px'}} type="text" id="profissional" required/>

               </div>

               <div>
                  <label className={S.labelForm} for='procedure'>Consulta:</label>
                  <select className={S.inputForm} style={{width:'255px'}}>
                     <option>Selecione a consulta</option>
                     {procedures.map((procedure) => (
                        <option key={procedure.id} value={procedure.id}>
                           {procedure.nome}
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