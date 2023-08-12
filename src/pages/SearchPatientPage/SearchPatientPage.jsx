import { Header } from '../../components/Header/Header';
import { SearchPatient } from '../../components/SearchPatient/SearchPatient';

export function SearchPatientPage() {
   return(
      <>
      <Header/>
      <SearchPatient
      title='Procurar paciente'/>
      </>
   )
}