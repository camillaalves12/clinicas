
import { Card } from "../../components/Card/Card"
import { Header } from "../../components/Header/Header"
import {DashPie} from "../../components/DashPie/DashPie"
import {DashSpline} from "../../components/DashSpline/DashSpline"
import { BiSearch } from 'react-icons/bi';
import { Form} from 'react-bootstrap';
import S from './styles.module.scss'

export function InitialPage() {
   return(
<>
      <Header />
      <div className={S.dashboard}>
         <div className={S.cards_date}>
            <div className={S.cards}>
               <Card 
               title='Saldo Diário'
               money= '250' 
               />
               <Card 
               title='Saldo Semanal'
               money= '550' 
               />
               <Card 
               title='Saldo Mensal'
               money= '2250' 
               />
            </div>
            <div className={S.searchDate}>
               <Form>
                  <Form.Control
                     placeholder="Pesquisar por período"
                     className={S.inputDate}
                     aria-label="Search"
                     style={{ outline: 'none', boxShadow: 'none', border: '1px solid #cdcdcd' }}
                     type="date"
                     />
               </Form>
               <Form>
                  <Form.Control
                     placeholder="Pesquisar por período"
                     className={S.inputDate}
                     aria-label="Search"
                     style={{ outline: 'none', boxShadow: 'none', border: '1px solid #cdcdcd' }}
                     type="date"
                  />
               </Form>
               <BiSearch className={S.iconSearch} />
            </div>
            
         </div>
         <div className={S.dashs}>
            <DashPie />
            <DashSpline />
         </div>
      </div>
</>

   )
}