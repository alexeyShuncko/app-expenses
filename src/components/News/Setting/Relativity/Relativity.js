import React from 'react';
import s from './Relativity.module.css';
import { Form, Field } from 'react-final-form';
import ArrowFunc from './../../helpers/ArrowFunc/ArrowFunc';
import ArrowValidate from './../../Arrow/ArrowValidate';
import OffStyle from './../../helpers/ArrowFunc/Offstyle';



const Relativity = (props) => {

    const returnSetting = () => {
        window.history.back()
    }

    const funcValidText = (e) => {    // валидация ввода, только русские буквы ... подумать над пробелом !!!!
        const regex1 = /[^А-ЯЁа-яё]/  //  и несколькими словами....
        const regexEng = /[A-Za-z]/
        if (regexEng.test(e.target.value)) {
            props.addText('Переключите на русский язык ...')
            props.addActivHedgehog(true)
        }
        e.target.value = e.target.value.replace(regex1, '')
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
        if (values.unit && values.name && values.price) {
            props.nameCaseRelativity(values.name, values.unit, values.price)

            props.addText(`Относительная величина "${values.name}" добавлена ...`)
            props.addActivHedgehog(true)
            OffStyle(['relativityUnitAdd', 'relativityNameAdd', 'relativityPriceAdd'])
            form.reset()
        }
        else if (!values.unit) {

            props.addText('Выберите из списка единицу измерения ...')
            props.addActivHedgehog(true)
            ArrowFunc('relativityUnit', 'relativityUnitAdd', 'buttonSetting')
        }
        else if (!values.name) {
            props.addText('Впишите название величины ...')
            props.addActivHedgehog(true)
            ArrowFunc('relativityName', 'relativityNameAdd', 'buttonSetting')
        }
        else if (!values.price) {
            props.addText('Впишите стоимость за единицу вашей величины ...')
            props.addActivHedgehog(true)
            ArrowFunc('relativityPrice', 'relativityPriceAdd', 'buttonSetting')
        }
    }

    return (
        <div className={s.mainRelativity}>
            <div className={s.title}>Добавление относительной величины</div>

            <Form
                onSubmit={onSubmit}
                render={({ handleSubmit, form, submitting, pristine, values }) => (
                    <form onSubmit={handleSubmit} >
                        <div className={s.relativityTotal}>
                            <div className={s.relativityArrow}>
                                <div className={s.nameArrow}>
                                    <div className={s.relativityBloc}>
                                        <label> Название величины: </label>
                                        <Field
                                            autoFocus='on'
                                            onInput={funcValidText}
                                            id='relativityNameAdd'
                                            className={s.relativityBlocField}
                                            autoComplete="off"
                                            name="name"
                                            placeholder={props.diagramm.relativity.case[2]}
                                            component="input"
                                            type="text"
                                            maxLength='13'
                                        />
                                    </div>
                                    <ArrowValidate arrowId='relativityName' />
                                </div>
                                <div className={s.nameArrow}>
                                    <div className={s.relativityBloc}>
                                        <label> Единицы измерения: </label>
                                        <Field
                                            id="relativityUnitAdd"
                                            className={s.relativityBlocField1}
                                            autoComplete="off"
                                            name="unit"
                                            component="select">
                                            <option />
                                            <option>штука</option>
                                            <option>пачка</option>
                                            <option>литр</option>
                                            <option>киллограмм</option>
                                            <option>пара</option>
                                            <option>бутылка</option>
                                        </Field>
                                    </div>
                                    <ArrowValidate arrowId='relativityUnit' />
                                </div>
                                <div className={s.nameArrow}>
                                    <div className={s.relativityBloc} >
                                        <label> Стоимость: </label>
                                        <Field
                                            onInput={funcValidNumber}
                                            id='relativityPriceAdd'
                                            className={s.relativityBlocField}
                                            autoComplete="off"
                                            name="price"
                                            placeholder={props.diagramm.relativity.price}
                                            component="input"
                                            type="number"
                                            step="0.01" />
                                    </div>
                                    <ArrowValidate arrowId='relativityPrice' />
                                </div>
                            </div>

                            <div className={s.instruction}>
                                <div className={s.instructionTitle}>
                                    Чтобы добавить относительную величину, следуйте ниже приведенным шагам:</div>
                                <div>
                                    <div>1) В поле "Название величины" впишите название вашей величины</div>
                                    <div>2) Из выпадающего списка "Единицы измерения" выберите в чем измеряется ваша величина</div>
                                    <div>3) В поле "Стоимость" впишите стоимость за одну единицу вашей величины в бел. рублях</div>
                                    <div>4) Нажмите кнопку "Добавить величину"
                                        <div>(увидеть пересчёт ваших расходов в относительную величину
                                            вы можете на странице "Статистика", выбрав категорию)</div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className={s.button}>
                            <button
                                className='buttonSetting'
                                type="submit"
                                disabled={submitting || pristine}>
                                Добавить величину
                            </button>
                            <span>
                                <button type="button" onClick={returnSetting}>
                                    Назад к настройкам
                                </button>
                            </span>
                        </div>
                    </form>
                )}
            />
        </div>
    )
}

export default Relativity