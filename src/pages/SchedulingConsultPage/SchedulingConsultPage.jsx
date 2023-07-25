import S from './styles.module.scss'
import {Header} from '../../components/Header/Header'

export function SchedulingConsultPage() {

    const procedure = [
        { id: 1, nome: 'Ultrassonografia' },
        { id: 2, nome: 'Raio X Digital' },
        { id: 3, nome: 'MAMOGRAFIA DIGITAL' },
        { id: 4, nome: 'Densitometria Óssea' },
        { id: 5, nome: 'Tomografia computadorizada' },
        { id: 6, nome: 'Endoscopia digestiva alta' },
        { id: 7, nome: 'PAAF' },
        { id: 8, nome: 'Exames ginecológicos (preventivo, colposcopia, biópsia do colo uterino)' },
        { id: 9, nome: 'Gastroenterologista' },
        { id: 10, nome: 'Clínico geral' },
        { id: 11, nome: 'Cirurgião' },
        { id: 12, nome: 'Mastologista' },
        { id: 13, nome: 'Oftalmologista' },
        { id: 14, nome: 'Ortopedista' },
        { id: 15, nome: 'Otorrinolaringologista' },
        { id: 16, nome: 'Dermatologista' },
        { id: 17, nome: 'Urologista' },
        { id: 18, nome: 'Geriatra' },
        { id: 19, nome: 'Médico do trabalho' },
        { id: 20, nome: 'Psiquiatra' },
    ]

    return(
        <>
        <Header />
        <form id="schedulingForm" className={S.container}>
        <div className={S.containerForm}>
          <h3 style={{ marginBottom: '1.5rem' }}>Agendamento</h3>

            <label className={S.labelForm} for="cpf_paciente">CPF do Paciente:</label>
            <input className={S.inputForm} type="text" id="cpf_paciente" required/>

          <div className={S.divForms}>

            <div>
            <label className={S.labelForm} for="date_procedure">Data do procedimento:</label>
            <input className={S.inputForm} style={{width:'255px', padding:'5px'}} type="date" id="date_procedure" required/>

            </div>

            <div>
              <label className={S.labelForm} for='procedure'>Procedimento:</label>
              <select className={S.inputForm} style={{width:'255px'}}>
                <option>Selecione o procedimento</option>
                  {procedure.map((procedure) => (
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
        </>
    )
}