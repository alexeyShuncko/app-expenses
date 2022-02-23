import React from 'react';
import { Form } from 'react-final-form';
import s from './FormDiagram.module.css';
import { Field } from 'react-final-form';
import Salary from './Salary/Salary';
import DollarRate from './DollarRate/DollarRate';
import HedgehogFunc from './../../../helpers/HedgehodFunc/HedgehogFunc';
import { DateFunc } from '../../../helpers/DateFunc/DateFunc';


const FormDiagram = (props) => {

    const diagramm = props.diagramm.category

    const funcValidNumber = (e) => {      // максимальная длинна 7 символов и 2 после запятой
        if (e.target.value.includes(".")) {
            e.target.value = e.target.value.substring(0, e.target.value.indexOf(".") + 3);
        }
        if (e.target.value.length > 7) {
            e.target.value = e.target.value.substr(0, 7)
        }
    }

    const onSubmit = (values, form) => {

        const timer = DateFunc(new Date())

        const value = () => {
            let valueArr = []
            for (let x in values) {
                valueArr.push(values[x])
            }
            return valueArr
        }
        let text = diagramm.map(a => Object.keys(values).includes(a.nameRus)
            ? a.nameRusСase
            : null).join(' ') // подумать ещё ....
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
                                    onInput={funcValidNumber}
                                    className={s.formItemsField}
                                    autoComplete="off"
                                    name={a.nameRus}
                                    placeholder="... бел. рублей"
                                    component="input"
                                    type="number"
                                    max='10000'
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


