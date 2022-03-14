import React from 'react';
import s from './Color.module.css';
import { Form, Field } from 'react-final-form';
import ArrowFunc from '../../helpers/ArrowFunc/ArrowFunc';


const Color = (props) => {

    const returnSetting = () => {
        window.history.back()
    }

    const onSubmit = (values) => {
        if (String(props.diagramm.category.map(a => a.color)) === String(Object.values(values))) {

            props.addText('Вы не изменили ни одного цвета ...')
            props.addActivHedgehog(true)
            ArrowFunc(null, null, 'buttonSetting')
        }
        else if (String(props.diagramm.category.map(a => a.color)) !== String(Object.values(values))) {


            props.addEditColor(Object.values(values), Object.keys(values))
            props.addText(`Цвет изменен ...`)
            props.addActivHedgehog(true)
        }
    }

    return (
        <div className={s.changeСolor}>
            <div className={s.title}>Изменение цвета категории</div>
            <Form
                onSubmit={onSubmit}
                render={({ handleSubmit, form, submitting, pristine, values }) => (
                    <form onSubmit={handleSubmit} >
                        <div className={s.changeСolorBloc}>
                            <div className={s.changeСolor}>
                                {props.diagramm.category.map(a =>
                                    <div className={s.item} key={a.nameRus}>
                                        <Field
                                            name={a.nameRus}
                                            defaultValue={a.color}
                                            className={s.inputColorValue}
                                            component="input"
                                            type="color" />
                                        <label className={s.itemName}> - {a.nameRus}</label>
                                    </div>
                                )}
                            </div>
                            <div className={s.instruction}>
                                <div className={s.instructionTitle}>
                                    Чтобы изменить цвет категории, следуйте ниже приведенным шагам:</div>
                                <div>
                                    <div>1) Нажмите на цветной квадрат рядом с названием категории</div>
                                    <div>2) Выберите нужный Вам цвет</div>
                                    <div>3) Нажмите в любое место экрана, кроме окна выбора цвета</div>
                                    <div>(Можно изменить сразу несколько цветов...)</div>
                                    <div>4) Нажмите кнопку "Изменить цвет"</div>
                                </div>
                            </div>
                        </div>
                        <div className={s.button}>
                            <button
                                className='buttonSetting'
                                type="submit"
                                disabled={submitting || pristine}>
                                Изменить цвет(-a)
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

export default Color