import React from 'react';
import s from './Color.module.css';
import { Form, Field } from 'react-final-form';
import HedgehogFunc from '../../helpers/HedgehodFunc/HedgehogFunc';
import ArrowFunc from '../../helpers/ArrowFunc/ArrowFunc';


const Color = (props) => {

    const returnSetting = () => {
        window.history.back()
    }

    const onSubmit = (values) => {
        if (String(props.diagramm.category.map(a => a.color)) === String(Object.values(values))) { 
            HedgehogFunc(props.addText, 'Вы не изменили ни одного цвета ...') 
            ArrowFunc(null, null, 'buttonSetting')}
        else if (String(props.diagramm.category.map(a => a.color)) !== String(Object.values(values))) {
            props.addEditColor(Object.values(values), Object.keys(values))
            HedgehogFunc(props.addText, 'Цвет изменен ...')
            ArrowFunc(null, null, 'buttonSetting')
        }
    }

    return (
        <div className={s.changeСolor}>
            <div className={s.title}>Изменение цвета категории</div>
            <div className={s.changeСolorBloc}>
                <div className={s.changeСolor}>

                    <Form
                        onSubmit={onSubmit}
                        render={({ handleSubmit, form, submitting, pristine, values }) => (
                            <form onSubmit={handleSubmit} >
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

                                <div className={s.button}>
                                    <button
                                     className='buttonSetting'
                                        type="submit"
                                        disabled={submitting || pristine}>
                                        Изменить цвет
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
                <div className={s.instruction}>
                    <div className={s.instructionTitle}>
                        Чтобы изменить цвет категории, следуйте ниже приведенным шагам:</div>
                    <div>
                        <div>1) Нажмите на цветной квадрат рядом с названием категории</div>
                        <div>2) Выберите нужный тебе цвет</div>
                        <div>3) Нажмите в любое место экрана, кроме окна выбора цвета</div>
                        <div>(Можно изменить сразу несколько цветов...)</div>
                        <div>4) Нажмите кнопку "Изменить цвет"</div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Color