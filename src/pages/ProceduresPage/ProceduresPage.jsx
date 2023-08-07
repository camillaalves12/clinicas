import { Table } from "../../components/Table/Table"
import { Header } from "../../components/Header/Header"
import { Card } from "../../components/Card/Card"

import S from './styles.module.scss'

export function ProceduresPage() {

   const dados = [
      { index: 1, patient: 'João', professional: 'Marcos', specialty:'Obstetra', value: 100, form_of_payment: 'pix', date:23 },
      { index: 2, patient: 'João', professional: 'Marcos', specialty:'Cardíaco', value: 150, form_of_payment: 'pix', date:23 },
      { index: 3, patient: 'Maria', professional: 'Gisele', specialty:'Geral', value: 150, form_of_payment: 'pix', date:23 },
      { index: 4, patient: 'Pedro', professional: 'LAB. NATLAB', specialty:'Exame', value: 150, form_of_payment: 'pix', date:23 },
      { index: 5, patient: 'Pedro', professional: 'Antonio', specialty:'Obstetra', value: 150, form_of_payment: 'pix', date:23 },
      { index: 5, patient: 'Pedro', professional: 'Antonio', specialty:'Obstetra', value: 150, form_of_payment: 'pix', date:23 },
      { index: 5, patient: 'Pedro', professional: 'Antonio', specialty:'Obstetra', value: 150, form_of_payment: 'pix', date:23 },
      { index: 5, patient: 'Pedro', professional: 'Antonio', specialty:'Obstetra', value: 150, form_of_payment: 'pix', date:23 },
      { index: 5, patient: 'Pedro', professional: 'Antonio', specialty:'Obstetra', value: 150, form_of_payment: 'pix', date:23 },
      { index: 5, patient: 'Pedro', professional: 'Antonio', specialty:'Obstetra', value: 150, form_of_payment: 'pix', date:23 },
      { index: 5, patient: 'Pedro', professional: 'Antonio', specialty:'Obstetra', value: 150, form_of_payment: 'pix', date:23 },
    ];

   return(
      <>
      <Header />
      <div className={S.pageInitial}>
         <div className={S.divCards} id='cardsContainer'>
            <div className={S.cards}>
                  <Card
                  title='Saldo Diário'
                  money= '750'
                  />
                  <Card
                  title='Saldo Semanal'
                  money= '5750'
                  />
                  <Card
                  title='Saldo Mensal'
                  money= '700.250'
                  />
            </div>
         </div>

         <div className={S.table }>
            <Table dados={dados}/>
         </div>
      </div>
      </>

   )
}