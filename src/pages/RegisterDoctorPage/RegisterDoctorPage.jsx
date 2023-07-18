import {RegisterDoctor} from '../../components/RegisterDoctor/RegisterDoctor'
import { Header } from '../../components/Header/Header'

export function RegisterDoctorPage() {
    return(
        <>
        <Header />
        <RegisterDoctor
        title='Cadastrar doutor'/>
        </>
    )
}