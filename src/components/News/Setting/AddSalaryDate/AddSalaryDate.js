import React from 'react';
import s from './AddSalaryDate.module.css';
import { Form, Field } from 'react-final-form';
import HedgehogFunc from '../../helpers/HedgehodFunc/HedgehogFunc';


const AddSalaryDate = (props) => {

    const arrDate = () => {
        let arrDay = []
        for (let i = 1; i < 32; i++) {
            arrDay.push(i)
        }
        return arrDay
    }
    let month = arrDate()

    const returnSetting = () => {
        window.history.back()
    }

    const onSubmit = (values) => {
        const day=()=> {
            if (values.selectDay < 10)
            {return 0 + values.selectDay }
            return values.selectDay
        }
props.addSalaryDay(day())
        HedgehogFunc(props.addText, `Зарплата ${values.selectDay}-го числа...`)

    }

    return (
        <div className={s.addSalaryDay}>
            <div className={s.title}>Добавление даты ЗП</div>
            <Form
                onSubmit={onSubmit}
                render={({ handleSubmit, form, submitting, pristine, values }) => (
                    <form onSubmit={handleSubmit} >
                        <div className={s.addSalaryDayBloc}>
                            <div className={s.addSalaryDay}>
                                <label className={s.itemName}> Число месяца - </label>
                                <Field name='selectDay'
                                    className={s.selectDay}
                                    component="select">
                                    <option />
                                    {month.map(a =>
                                        <option value={a} key={a}>{a}</option>)}
                                </Field>
                            </div>
                            <div className={s.instruction}>
                                <div className={s.instructionTitle}>
                                    Чтобы добавить дату ЗП, следуйте ниже приведенным шагам:</div>
                                <div>
                                    <div>1) Выберите число вашей ЗП</div>
                                    <div>2) Нажмите кнопку "Добавить дату"</div>
                                </div>
                            </div>
                        </div>
                        <div className={s.button}>
                            <button
                                className='buttonSetting'
                                type="submit"
                                disabled={submitting || pristine}>
                                Добавить дату
                            </button>
                            <button
                                type="button"
                                onClick={returnSetting}>
                                Назад к настройкам
                            </button>
                        </div>

                    </form>
                )}
            />
        </div>

    )

}

export default AddSalaryDate