import React from 'react';
import s from './AddSalaryDate.module.css';
import { Form, Field } from 'react-final-form';
import HedgehogFunc from '../../helpers/HedgehodFunc/HedgehogFunc';
import ArrowValidate from '../../Arrow/ArrowValidate';
import ArrowFunc from '../../helpers/ArrowFunc/ArrowFunc';


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

        if (values.name && values.selectDay) {
            const day = () => {
                if (values.selectDay < 10) { return 0 + values.selectDay }
                return values.selectDay
            }
            props.addSalaryDay(values.name, day())
            HedgehogFunc(props.addText, `${values.name} ${values.selectDay}-го числа, я запомнил  ...`)
            values.selectDay = ''
        }
        else if (!values.selectDay) {
            ArrowFunc('arrowSalaryDay', 'selectDay', 'buttonSalaryDay')
            HedgehogFunc(props.addText, `Выберите дату, когда у вас ${values.name} ...`)
        }


    }

    return (
        <div>
            <div className={s.title}>Добавление/изменение даты доходов</div>
            <Form
                onSubmit={onSubmit}
                render={({ handleSubmit, form, submitting, pristine, values }) => (
                    <form onSubmit={handleSubmit} >
                        <div className={s.addSalaryDayBloc}>
                            <div className={s.addSalaryDay}>
                                <div className={s.income}>
                                    <label className={s.itemName}> Доход - </label>
                                    <Field
                                        autoFocus='on'
                                        defaultValue='Зарплата'
                                        className={s.fieldName}
                                        autoComplete="off"
                                        name='name'
                                        component="select" >
                                        <option value='Зарплата'> Зарплата</option>
                                        <option value='Аванс'>Аванс</option>
                                    </Field>
                                </div>
                                <div className={s.nameArrow}>
                                    <div className={s.income}>
                                        <label className={s.itemName}> Дата - </label>
                                        <Field
                                            id='selectDay'
                                            name='selectDay'
                                            className={s.selectDay}
                                            component="select">
                                            <option />
                                            {month.map(a =>
                                                <option value={a} key={a}>{a}</option>)}
                                        </Field>
                                    </div>

                                    <ArrowValidate arrowId='arrowSalaryDay' />
                                </div>

                            </div>
                            <div className={s.instruction}>
                                <div className={s.instructionTitle}>
                                    Чтобы добавить/изменить дату доходов, следуйте ниже приведенным шагам:</div>
                                <div>
                                    <div>1) Выберите доход из выпадающего списка</div>
                                    <div>2) Выберите дату из выпадающего списка</div>
                                    <div>3) Нажмите кнопку "Добавить дату"</div>
                                </div>
                            </div>
                        </div>
                        <div className={s.button}>
                            <button
                                className='buttonSalaryDay'
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