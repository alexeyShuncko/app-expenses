import React from 'react';
import { Form } from 'react-final-form';
import s from './Salary.module.css';
import { Field } from 'react-final-form';
import { useState, useEffect } from 'react';
import HocValuta from '../../../../HOC/HocValuta';
import HedgehogFunc from '../../../../helpers/HedgehodFunc/HedgehogFunc';
import ArrowFunc from '../../../../helpers/ArrowFunc/ArrowFunc';
import ArrowValidate from './../../../../Arrow/ArrowValidate';
import { getItem } from '../../../../../../API/api';


const Salary = (props) => {

    let [editMode, setEditMode] = useState(false)

    const activateEditMode = () => {
        setEditMode(true)

    }
    const deActivateEditMode = () => {
        setEditMode(false)
    }
    useEffect(() => {
        if (timer >= props.diagramm.salary.salaryDate && props.diagramm.salary.salaryValueTrue) {
            props.addSalaryValueTrue(false)
        }
    },
    );

    const time = new Date()
    function formatDate(date) {

        var dd = date.getDate();
        if (dd < 10) dd = '0' + dd;

        var mm = date.getMonth() + 1;
        if (mm < 10) mm = '0' + mm;

        var yy = date.getFullYear() % 100;
        if (yy < 10) yy = '0' + yy;
        var HH = date.getHours();
        if (HH < 10) HH = '0' + HH;

        var MM = date.getMinutes();
        if (MM < 10) MM = '0' + MM;

        var SS = date.getSeconds();
        if (SS < 10) SS = '0' + SS;

        return '20' + yy + '-' + mm + '-' + dd + ' ' + HH + ':' + MM + ':' + SS;
    }
    const timer = formatDate(time)

    const month = new Date()
    function formatMonth(date) {

        var mm = date.getMonth() + 1;
        if (mm < 10) mm = '0' + mm;
        return mm;
    }
    const months = Number(formatMonth(month))


    const onSubmit = (values) => {

        if (values.salary && values.valuta) {

            console.log(Object.values( getItem()))
            HedgehogFunc(props.addText, 'Поздравляю с ЗП ...')
                deActivateEditMode()
            if (values.valuta === 'BYN') {
                props.addSalary(Number(values.salary).toFixed(2), months)
            }
            else if (values.valuta === 'USD') {
                props.addSalary(
                    (Number(values.salary) * Number(props.exchangeRates.dollar.Cur_OfficialRate)).toFixed(2), months)  
            }
            else if (values.valuta === 'EUR') {
                props.addSalary(
                    (Number(values.salary) * Number(props.exchangeRates.euro.Cur_OfficialRate)).toFixed(2), months)
            }
        }
  
        else if (!values.salary) {
            HedgehogFunc(props.addText, 'Введите сумму ЗП ...')
            ArrowFunc('arrowSalaryAdd', 'addTotalInput', 'addSalary')
        }
        else if (!values.valuta) {
            HedgehogFunc(props.addText, 'Выберите валюту ЗП ...')
            ArrowFunc('arrowSalaryAdd', 'addValutaInput', 'addSalary')
        }

    }

    return (

        <div>

            {timer >= props.diagramm.salary.salaryDate
                ? <div className={s.salaryUpdate} onClick={activateEditMode}>Нажмите, чтобы обновить ЗП</div>
                : null}

            <div className={s.salaryValue}>
                <div className={s.salaryName}>Зарплата:</div>
                <div>
                   <HocValuta 
                   edit={activateEditMode}
                   value='salary' 
                   exchangeRates={props.exchangeRates}
                   salary={props.diagramm.salary.salaryNum}/>
                </div>
            </div>


            {editMode
                ? <Form
                    onSubmit={onSubmit}
                    render={({ handleSubmit, form, submitting, pristine, values }) => (
                        <form onSubmit={handleSubmit} className={s.form}>
                            <div className={s.salary}>
                                <div className={s.salaryAddBloc}>
                                    <div className={s.salaryAdd}>
                                        <label> Сумма: </label>
                                        <Field
                                            id='addTotalInput'
                                            className={s.inputSalary}
                                            autoFocus={true}
                                            autoComplete="off"
                                            name="salary"
                                            component="input"
                                            type="number"
                                            step="0.01" />
                                    </div>
                                    <div className={s.valutaAdd}>
                                        <label> Валюта: </label>
                                        <Field
                                            id='addValutaInput'
                                            className={s.fieldBynUsd}
                                            name="valuta"
                                            component="select" >
                                            <option />
                                            <option value="BYN">BYN</option>
                                            <option value="USD">USD</option>
                                            <option value="EUR">EUR</option>
                                        </Field>
                                    </div>
                                </div>
                                <div className={s.arrowSalary}>
                                    <ArrowValidate arrowId='arrowSalaryAdd' />
                                </div>
                            </div>
                            <div className={s.buttonSalary}>
                                <button
                                    className='addSalary'
                                    type="submit"
                                    disabled={submitting || pristine}>
                                    Добавить
                                </button>
                                <button type="button" onClick={deActivateEditMode}>
                                    Назад
                                </button>

                            </div>
                        </form>
                    )}
                />
                : null}
            <div className={s.salaryValue}>
                <div className={s.salaryName}>Всего потрачено:</div>
                <HocValuta 
                value='salarySpent' 
                exchangeRates={props.exchangeRates}
                salary={props.diagramm.salary.salaryNum}
                category={props.diagramm.category}/>
            </div>
            <div className={s.salaryValue}>
                <div className={s.salaryName}>Должно остаться:</div>
                <HocValuta 
                value='salaryRemainder' 
                exchangeRates={props.exchangeRates} 
                salary={props.diagramm.salary.salaryNum}
                category={props.diagramm.category}/>
            </div>
        </div>
    )
}


export default Salary

