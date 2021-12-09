import React from 'react';
import { Form } from 'react-final-form';
import s from './FormDiagram.module.css';
import { Field } from 'react-final-form';
import Salary from './Salary/Salary';
import DollarRate from './DollarRate/DollarRate';


const FormDiagram = (props) => {


    const onSubmit = (values, form) => {

        const nameFor = () => {
            for (let x in values) {
                return x
            }
        }
        const name = nameFor()

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
         props.addDiagramm(name,values[name], timer)
        form.reset()

    }

    const diagramm = props.diagramm.category

    function fieldInput(array) {
        let field = []
        for (let item of Object.values(array)) {
            if (item.nameRus)
                field.push(<div key={field.length + 1} className={s.formItems}>
                    <label className={s.formItemsLabel}>
                        {item.nameRus.slice(-1) === 'а'
                            ? item.nameRus.slice(0, -1) + 'у'
                            : item.nameRus}: </label>
                    <Field 
                        className={s.formItemsField}
                        max="1000"
                        autoComplete="off"
                        name={item.nameRus}
                        placeholder="... рублей"
                        component="input"
                        type="number"
                        step={0.01}
                    />
                </div>)
        }
        return field
    }

    return (
        <div className={s.formExpenses}>
            <Salary
                diagramm={props.diagramm}
                addSalary={props.addSalary}
                addSalaryValueTrue={props.addSalaryValueTrue}
            />
            <div className={s.formExpensesName}>Сумма денег, потраченных на :</div>
            <div className={s.formExpensesFild}>
                <Form
                    onSubmit={onSubmit}
                    render={({ handleSubmit, form, submitting, pristine, values }) => (
                        <form onSubmit={handleSubmit} >
                            {fieldInput(diagramm)}

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
                getDollarUpdate={props.getDollarUpdate}
                dollar={props.diagramm.dollar}
            />
        </div>
    )
}

export default FormDiagram


