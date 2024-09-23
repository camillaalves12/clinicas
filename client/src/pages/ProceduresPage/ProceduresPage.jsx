import { Table } from "../../components/Table/Table"
import { Header } from "../../components/Header/Header"

import S from './styles.module.scss'

export function ProceduresPage() {

   // const dados = [
   //    { index: 1, patient: 'Waldsson', professional: 'Marcos', specialty:'Obstetra', value: 100, form_of_payment: 'pix', date:23 },
   //    { index: 2, patient: 'João', professional: 'Marcos', specialty:'Cardíaco', value: 150, form_of_payment: 'pix', date:23 },
   //    { index: 3, patient: 'Maria', professional: 'Gisele', specialty:'Geral', value: 150, form_of_payment: 'pix', date:23 },
   //    { index: 4, patient: 'Pedro', professional: 'LAB. NATLAB', specialty:'Exame', value: 150, form_of_payment: 'pix', date:23 },
   //    { index: 5, patient: 'Pedro', professional: 'Antonio', specialty:'Obstetra', value: 150, form_of_payment: 'pix', date:23 },
   //    { index: 5, patient: 'Pedro', professional: 'Antonio', specialty:'Obstetra', value: 150, form_of_payment: 'pix', date:23 },
   //    { index: 5, patient: 'Pedro', professional: 'Antonio', specialty:'Obstetra', value: 150, form_of_payment: 'pix', date:23 },
   //    { index: 5, patient: 'Pedro', professional: 'Antonio', specialty:'Obstetra', value: 150, form_of_payment: 'pix', date:23 },
   //    { index: 5, patient: 'Pedro', professional: 'Antonio', specialty:'Obstetra', value: 150, form_of_payment: 'pix', date:23 },
   //    { index: 5, patient: 'Pedro', professional: 'Antonio', specialty:'Obstetra', value: 150, form_of_payment: 'pix', date:23 },
   //    { index: 5, patient: 'Pedro', professional: 'Antonio', specialty:'Obstetra', value: 150, form_of_payment: 'pix', date:23 },
   //  ];

   return(
      <>
      <Header />
      <div className={S.pageInitial}>
      <h2>Resumo</h2>
         <div className={S.table }>
            <Table />
         </div>
      </div>
      </>

   )
}