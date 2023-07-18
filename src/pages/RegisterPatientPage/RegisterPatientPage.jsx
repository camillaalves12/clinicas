import { Header } from "../../components/Header/Header"
import { RegisterPatient } from "../../components/RegisterPatient/RegisterPatient"

export function RegisterPatientPage() {
    return(
        <>
        <Header/>
        <RegisterPatient 
        title='Cadastrar paciente'/>
        </>
    )
}