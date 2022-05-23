import React from "react";
import s from './RelativityStatistic.module.css';


const RelativityStatistic = (props) => {

    let data = props.diagramm.category.find(a => a.id === props.diagramm.activ.id)

    let summ = data.data
    .map(a=> a.amount)
    .reduce((acc, num) => acc + num, 0)

    let amount = Number(( summ / props.diagramm.relativity.amount).toFixed(0).slice(-1))
    let amount11 = Number((summ / props.diagramm.relativity.amount).toFixed(0).slice(-2))


    let bottle = ['бутылки', 'бутылок', 'бутылка']
    let kg = ['килограмма', 'килограмм', 'килограмм']
    let pack = ['пачки', 'пачек', 'пачка']
    let liter = ['литра', 'литров', 'литр']
    let two = ['пары', 'пар', 'пара']
    

    const obj = () => {
        if (props.diagramm.relativity.value === 'бутылка')
            return bottle
        else if (props.diagramm.relativity.value === 'килограмм')
            return kg
        else if (props.diagramm.relativity.value === 'пачка')
            return pack
        else if (props.diagramm.relativity.value === 'литр')
            return liter
        else if (props.diagramm.relativity.value === 'пара')
            return two
        else if (props.diagramm.relativity.value === 'штука')
            return props.diagramm.relativity.case
    }

    const unit = () => {
        if (amount <= 4
            && amount >= 2
            && !(amount11 <= 19 && amount11 >= 11))
            return obj()[0] || obj().name1

        else if (amount >= 5 || amount === 0 || (amount11 <= 19 && amount11 >= 11))
            return obj()[1] || obj().name2

        else return obj()[2] || obj().name3
    }
    let unitRus = unit()


    return (
        <div>
          
            <span > Потрачено
                <div >За всё время:
                    <span  className={s.boldValue}>{summ.toFixed(2)} рублей.</span>
                </div>

            </span>
            <div>Или:
                <span className={s.boldValue}>{(summ / props.diagramm.exchangeRates.dollar.Cur_OfficialRate).toFixed(2)} $</span>
            </div>
            <div>Или:
                <span className={s.boldValue}>{(summ / props.diagramm.exchangeRates.euro.Cur_OfficialRate).toFixed(2)} €</span>
            </div>
            <div 
            style={{ borderBottom: `solid ${data.color}` }}
            >
                Или:<span className={s.boldValue} title='Относительная величина'>
                    {props.diagramm.relativity.value === 'штука'
                        ? (summ / props.diagramm.relativity.amount).toFixed(0) + ' ' +
                        unitRus 
                        : (summ / props.diagramm.relativity.amount).toFixed(0) + ' ' +
                        unitRus + ' ' +
                        props.diagramm.relativity.name}
                </span>
            </div>
        </div>


    )
}


export default RelativityStatistic