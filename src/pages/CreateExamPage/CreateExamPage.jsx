import {Forms} from '../../components/Forms/Forms';
import {Header} from '../../components/Header/Header';
import S from './styles.module.scss';

export function CreateExamPage() {

   const exames = [
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
            <Forms
               title='Criar exame'
               controlIdFirst='controlIdPacient'
               labelProfessional='Profissional:'
               controlIdSecond='controlIdProfessional'
               labelProcedure='Procedimento:'
               controlIdFThird='controlIdExam'
               nameEspecialty='Procedimento:'
               placeholderProcedure='Selecione o procedimento:'
               controlIdfourth='controlIdMoney'
               controlIdFifth ='controlId_form_of_payment'
               procedures={exames}
            />
         </div>
      </div>
      </>
   )
}