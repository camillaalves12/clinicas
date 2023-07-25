import S from './styles.module.scss'
import { Header } from '../../components/Header/Header'

export function RegisterDoctorPage() {
    return(
        <>
        <Header />
        <form id="registerDoctorForm" className={S.container}>
            <div className={S.containerForm}>
               <h3 style={{ marginBottom: '1.5rem' }}>Cadastrar profissional</h3>

               <label className={S.labelForm} for="nameProfessional">Nome:</label>
               <input className={S.inputForm} type="text" id="nameProfessional" required/>

               <label className={S.labelForm} for="specialty">Especialidade:</label>
               <input className={S.inputForm} type="text" id="specialty" required/>

            </div>
            </form>
        </>
    )
}