import React from "react";
import s from './RelativityStatistic.module.css';


const RelativityStatistic = (props) => {

    let data = props.diagramm.category.filter(a => a.nameRus === props.diagramm.activ)
    let amount = Number((data[0].summ / props.diagramm.relativity.price).toFixed(0).slice(-1))
    let amount11 = Number((data[0].summ / props.diagramm.relativity.price).toFixed(0).slice(-2))

let bottle = ['бутылки','бутылок','бутылка']
let kg = ['киллограмма','киллограмм','киллограмм']
let pack =['пачки','пачек','пачка']
let liter = ['литра','литров','литр']
let two = ['пары','пар','пара']

const obj =()=> {
    if (props.diagramm.relativity.unit === 'бутылка')
    return bottle
     else if (props.diagramm.relativity.unit === 'киллограмм')
    return kg 
    else if (props.diagramm.relativity.unit === 'пачка')
    return pack
    else if (props.diagramm.relativity.unit === 'литр')
    return liter
    else if (props.diagramm.relativity.unit === 'пара')
    return two

}

    const unit = () => {

        if ( amount <= 4
            && amount >= 2
            && !(amount11 <= 19 && amount11 >= 11))
            return obj()[0]

        else if (amount >= 5 || amount === 0 || (amount11 <= 19 && amount11 >= 11))
            return obj()[1]

        else return obj()[2]
    }
    let unitRus = unit()


    return (
        <div>
            <span> Потрачено за всё время:
                <span className={s.boldValue}>{data[0].summ.toFixed(2)} рублей.</span>
            </span>
            <div>Или:
                <span className={s.boldValue}>{(data[0].summ / props.diagramm.dollar.Cur_OfficialRate).toFixed(2)} $</span>
            </div>
            <div style={{ borderBottom: `solid ${data[0].color}` }}>
                Или:<span className={s.boldValue}>
                    {(data[0].summ / props.diagramm.relativity.price).toFixed(0) + ' ' +
                        unitRus + ' ' +
                        props.diagramm.relativity.name}
                </span>
            </div>
        </div>


    )
}


export default RelativityStatistic