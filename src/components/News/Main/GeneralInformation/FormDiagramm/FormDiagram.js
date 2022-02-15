import React from 'react';
import { Form } from 'react-final-form';
import s from './FormDiagram.module.css';
import { Field } from 'react-final-form';
import Salary from './Salary/Salary';
import DollarRate from './DollarRate/DollarRate';
import HedgehogFunc from './../../../helpers/HedgehodFunc/HedgehogFunc';


const FormDiagram = (props) => {


    const diagramm = props.diagramm.category

    const onSubmit = (values, form) => {

        const time = new Date()
        function formatDate(date) {

            let dd = date.getDate();
            if (dd < 10) dd = '0' + dd;

            let mm = date.getMonth() + 1;
            if (mm < 10) mm = '0' + mm;

            let yy = date.getFullYear() % 100;
            if (yy < 10) yy = '0' + yy;

            let HH = date.getHours();
            if (HH < 10) HH = '0' + HH;

            let MM = date.getMinutes();
            if (MM < 10) MM = '0' + MM;

            return '20' + yy + '-' + mm + '-' + dd + ' ' + HH + ':' + MM;
        }
        const timer = formatDate(time)



        const value = () => {
            let valueArr = []
            for (let x in values) {
                valueArr.push(values[x])
            }
            return valueArr
        }
        let text = diagramm.map(a => Object.keys(values).includes(a.nameRus) 
        ? a.nameRusСase
        : null ).join(' ') // подумать ещё ....
        console.log(text)
        HedgehogFunc(props.addText,
            `Расходы на  "${text}" добавлены ...`)

        props.addDiagramm(Object.keys(values), value(values), timer)
        form.reset()

    }

 


    return (
        <div className={s.formExpenses}>
            <Salary
                exchangeRates={props.exchangeRates}
                diagramm={props.diagramm}
                addSalary={props.addSalary}
                addSalaryValueTrue={props.addSalaryValueTrue}
                addText={props.addText}
            />
            <div className={s.formExpensesName}>Сумма денег, потраченных на :</div>
            <div className={s.formExpensesFild}>
                <Form
                    onSubmit={onSubmit}
                    render={({ handleSubmit, form, submitting, pristine, values }) => (
                        <form onSubmit={handleSubmit} >
                            {diagramm.map(a => <div key={a.nameRus} className={s.formItems}>
                                <label className={s.formItemsLabel}>
                                    {a.nameRusСase}: </label>
                                <Field
                                    className={s.formItemsField}
                                    max="1000"
                                    autoComplete="off"
                                    name={a.nameRus}
                                    placeholder="... рублей"
                                    component="input"
                                    type="number"
                                    step={0.01}
                                />
                            </div>)}

                            <div className={s.formItemsButton}>
                                <button type="submit"
                                    disabled={submitting || pristine} //сделать видимой невидимой
                                >
                                    Добавить
                                </button>
                            </div>
                        </form>
                    )}
                />
            </div>
            <DollarRate
                getEuroUpdate={props.getEuroUpdate}
                getDollarUpdate={props.getDollarUpdate}
                exchangeRates={props.exchangeRates}
            />
        </div>
    )
}

export default FormDiagram


