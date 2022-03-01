import React, { useState } from 'react';
import { Form, Field } from 'react-final-form';
import s from './Income.module.css';
import HedgehogFunc from '../../../helpers/HedgehodFunc/HedgehogFunc';
import { DateFunc } from '../../../helpers/DateFunc/DateFunc';


const Income = (props) => {

    let [editMode, setEditMode] = useState(false)

    const activateEditMode = () => {
        setEditMode(true)
    }
    const deActivateEditMode = () => {
        setEditMode(false)
    }



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

        HedgehogFunc(props.addText,
            `${values.expenses} ${values.valuta} добавлено ...`)

        props.addIncome(values.name, timer, Number(values.expenses), values.valuta)
        deActivateEditMode()
    }



    return (
        <div className={s.expenses}>

            {!editMode
                ? <button onClick={activateEditMode}>Добавить доходы</button>
                :
                <div>
                    <div className={s.expensesName}>Доходы:</div>
                    <div className={s.formExpensesFild}>
                        <Form
                            onSubmit={onSubmit}
                            render={({ handleSubmit, form, submitting, pristine, values }) => (
                                <form onSubmit={handleSubmit} >
                                    <div className={s.expensesBloc}>
                                        <div className={s.expensesItem}>
                                            <label>Название:</label>
                                            <Field
                                                className={s.formItemsField}
                                                autoComplete="off"
                                                name='name'
                                                component="select" >
                                                <option />
                                                <option value='Зарплата'>Зарплата</option>
                                                <option value='Аванс'>Аванс</option>
                                            </Field>
                                        </div>
                                        <div className={s.expensesItem}>
                                            <label>Сумма:</label>
                                            <Field
                                                onInput={funcValidNumber}
                                                className={s.formItemsField}
                                                autoComplete="off"
                                                name='expenses'
                                                placeholder="... бел. рублей"
                                                component="input"
                                                type="number"
                                                max='10000'
                                                step={0.01} />
                                        </div>
                                        <div className={s.expensesItem}>
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

                                    <div className={s.formItemsButton}>
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
                    </div>
                </div>
            }

        </div>
    )
}

export default Income


