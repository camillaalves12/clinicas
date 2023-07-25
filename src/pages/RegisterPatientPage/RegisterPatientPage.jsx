import { Header } from "../../components/Header/Header"
import S from './styles.module.scss'

export function RegisterPatientPage() {
    return(
        <>
        <Header/>
        <form id="registerPatientForm" className={S.container}>
            <div className={S.containerForm}>
               <h3 style={{ marginBottom: '1.5rem' }}>Cadastrar paciente</h3>

               <label className={S.labelForm} for="namePatient">Nome Completo:</label>
               <input className={S.inputForm} type="text" id="namePatient" required/>

               <div className={S.divForms}>

                <div>
                    <label className={S.labelForm} for="date_birth">Data de nascimento:</label>
                    <input className={S.inputForm} style={{width:'255px', padding:'5px'}} type="date" id="date_birth" required/>
                </div>

                <div>
                    <label className={S.labelForm} for='cpf_patient'>CPF:</label>
                    <input className={S.inputForm} style={{width:'255px'}} type="text" id="cpf_patient" required/>
                </div>

               </div>

                <div className={S.divForms} style={{gap:'1rem',marginTop:'0.2rem', marginBottom:'0.2rem'}}>
                    <label className={S.labelForm} for="sex">Sexo:</label>
                    <div>
                        <label for='feminine' style={{marginRight:'7px'}}>Feminino</label>
                        <input type="radio" id="feminine" name="sex" value="Feminino"/>
                    </div>
                    <div>
                        <label for='masculine' style={{marginRight:'7px'}}>Masculino</label>
                        <input  type="radio" id="masculine" name="sex" value="Masculino"/>
                    </div>

                </div>

                     <label className={S.labelForm} for="phone">Telefone:</label>
                     <input className={S.inputForm}  type="text" id="valor" step="0.01" required/>
                  
                <div className={S.divBtn}>
                    <input className={S.btn} type="submit" option="Enviar"/>
                </div>
            </div>
            </form>
        </>
    )
}