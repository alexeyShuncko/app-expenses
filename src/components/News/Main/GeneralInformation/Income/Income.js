import React, { useState } from 'react';
import { Form, Field } from 'react-final-form';
import s from './Income.module.css';
import HedgehogFunc from '../../../helpers/HedgehodFunc/HedgehogFunc';
import { DateFunc } from '../../../helpers/DateFunc/DateFunc';
import ArrowValidate from './../../../Arrow/ArrowValidate';
import ArrowFunc from '../../../helpers/ArrowFunc/ArrowFunc';


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
        if (values.income) {
            const timer = DateFunc(new Date())

            HedgehogFunc(props.addText,
                `Добавлено:  ${values.name} ${values.income} ${values.valuta} ...`)

            props.addSalaryMonth(values.name,(Number(timer.slice(5, 7)) + 1))
            props.addIncome(values.name, timer, Number(values.income), values.valuta)
            deActivateEditMode()
        }
        else if (!values.income) {
            HedgehogFunc(props.addText, 'Введите сумму доходов ...')
            ArrowFunc('arrowIncome', 'incomeNum', 'buttonIncome')
        }

    }



    return (
        <div className={s.expenses}>

            {!editMode
                ? <div className={s.incomeButton}>
<button  onClick={activateEditMode}>Добавить доходы</button>
                </div>
                
                :
                <div>
                    <div className={s.incomeName}>Доходы:</div>
                    <div className={s.formIncomeFild}>
                        <Form
                            onSubmit={onSubmit}
                            render={({ handleSubmit, form, submitting, pristine, values }) => (
                                <form onSubmit={handleSubmit} >
                                    <div className={s.nameArrow}>
                                        <div className={s.incomeBloc}>
                                            <div className={s.incomeItem}>
                                                <label>Название:</label>
                                                <div className={s.incomeItemField}>
                                                    <Field
                                                        autoFocus='on'
                                                        defaultValue='Зарплата'
                                                        className={s.fieldName}
                                                        autoComplete="off"
                                                        name='name'
                                                        component="select" >
                                                        <option value='Зарплата'> Зарплата</option>
                                                        <option value='Аванс'>Аванс</option>
                                                        <option value='Другие'>Другие</option>
                                                    </Field>
                                                </div>
                                            </div>
                                            <div className={s.incomeItem}>
                                                <label>Сумма:</label>
                                                <Field
                                                    id='incomeNum'
                                                    onInput={funcValidNumber}
                                                    className={s.formItemsField}
                                                    autoComplete="off"
                                                    name='income'
                                                    placeholder="1111.11"
                                                    component="input"
                                                    type="number"
                                                    max='10000'
                                                    step={0.01} />
                                            </div>
                                            <div className={s.incomeItem}>
                                                <label> Валюта: </label>
                                                <Field
                                                    defaultValue='BYN'
                                                    className={s.fieldBynUsd}
                                                    name="valuta"
                                                    component="select" >
                                                    <option value="BYN">BYN</option>
                                                    <option value="USD">USD</option>
                                                    <option value="EUR">EUR</option>
                                                </Field>
                                            </div>
                                        </div>

                                        <ArrowValidate arrowId='arrowIncome' />
                                    </div>

                                    <div className={s.formItemsButton}>
                                        <button className='buttonIncome'
                                            type="submit" disabled={submitting || pristine}>
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


