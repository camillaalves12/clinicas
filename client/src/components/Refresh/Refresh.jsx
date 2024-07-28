import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import S from './styles.module.scss'

export default function Refresh({title}) {
   return(
      <div className={S.container}>
         <div className={S.divItens}>
            <Spinner
               as="span"
               animation="border"
               size="sm"
               role="status"
               aria-hidden="true"
               className={S.spinner}
               style={{width:'2rem', height:'2rem'}}
            />
            <Button disabled className={S.btnRefresh} style={{background:'#fff', color: '#000', border:'none', fontSize:'32px'}}>
            {title}
            </Button>
         </div>
    </div>
   )
}
