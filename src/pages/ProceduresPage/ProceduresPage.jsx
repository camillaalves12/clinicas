import { Table } from "../../components/Table/Table"
import { Header } from "../../components/Header/Header"
import { Card } from "../../components/Card/Card"

import S from './styles.module.scss'

export function ProceduresPage() {

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

         <div className={S.table}>
            <Table />
         </div>
      </div>
      </>

   )
}