import { TbCurrencyReal } from 'react-icons/tb';
import S from './styles.module.scss';

export function Card({title, money}){
    return(
        <div className={S.container}>
            <div className={S.card}>
                <div>
                    <TbCurrencyReal className={S.iconReal}/> 
                </div>
                <div className={S.description}>
                    <span className={S.description_title}>{ title }</span>
                    <span className={S.description_money}><TbCurrencyReal className={S.iconRealDescription}/> { money }</span>
                </div>
            </div>
        </div>
    )
}