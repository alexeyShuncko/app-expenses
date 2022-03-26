import React, { useState } from 'react';
import { Form, Field } from 'react-final-form';
import s from './Expenses.module.css';
import { DateFunc } from '../../../helpers/DateFunc/DateFunc';
import { Button } from 'antd';


const Expenses = (props) => {

    let [editMode, setEditMode] = useState(false)

    const activateEditMode = () => {
        setEditMode(true)
    }
    const deActivateEditMode = () => {
        setEditMode(false)
    }


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

        
        props.addText( `Расходы на  "${text}" добавлены ...`)
        props.addActivHedgehog(true)

        props.addDiagramm(Object.keys(values), value(values), timer)
        form.reset()

    }


    return (
        <div className={s.expenses}>

            {!editMode
                ? <div className={s.buttonExpenses}>
                    <Button type="primary" danger onClick={activateEditMode}>Добавить расходы</Button>
                </div>

                :
                <div>
                    <div className={s.formExpensesName}>Расходы на :</div>
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

export default Expenses


