import React from 'react';
import { Form } from 'react-final-form';
import s from './Salary.module.css';
import { Field } from 'react-final-form';
import { useState, useEffect } from 'react';
import SalarySpent from './SalarySpent/SalarySpent';
import SalaryRemainder from './SalaryRemainder/SalaryRemainder';
import SalaryValue from './SalaryValue/SalaryValue';
import { HocValuta } from './../../../../HOC/HocValuta';


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
            console.log(11)
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
    const months = formatMonth(month)


    const onSubmit = (values) => {

        if (values.valuta === 'BYN')
            props.addSalary(Number(values.salary).toFixed(2), months)
        else if (values.valuta === 'USD') {
            props.addSalary((Number(values.salary) * Number(props.diagramm.dollar.Cur_OfficialRate)).toFixed(2), months)
        }
        deActivateEditMode()
    }

    return (

        <div>

            {timer >= props.diagramm.salary.salaryDate
                ? <div className={s.salaryUpdate}>Обнови ЗП</div>
                : null}

            {HocValuta(SalaryValue, props, activateEditMode)}

            {editMode
                ? <Form
                    onSubmit={onSubmit}
                    render={({ handleSubmit, form, submitting, pristine, values }) => (
                        <form onSubmit={handleSubmit} className={s.form}>

                            <div>
                                <label> </label>
                                <Field 
                                    autoFocus={true}
                                    autoComplete="off"
                                    name="salary"
                                    component="input"
                                    type="number"
                                    step="0.01" 
                                    required/>
                            </div>
                            <Field className={s.fieldBynUsd}
                                name="valuta" component="select" required >
                                <option>Валюта</option>
                                <option value="BYN">BYN</option>
                                <option value="USD">USD</option>
                            </Field>

                            <div >
                                <button type="submit" disabled={submitting || pristine}>
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
            <div >
                {HocValuta(SalarySpent, props)}
            </div>
            <div >
                {HocValuta(SalaryRemainder, props)}
            </div>
        </div>
    )
}


export default Salary

