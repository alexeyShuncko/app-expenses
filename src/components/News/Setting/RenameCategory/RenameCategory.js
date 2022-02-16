import React from 'react';
import s from './RenameCategory.module.css';
import a from '../../Hedgehog/Hedgehog.module.css';
import { Field, Form } from 'react-final-form';
import HedgehogFunc from './../../helpers/HedgehodFunc/HedgehogFunc';
import ArrowFunc from '../../helpers/ArrowFunc/ArrowFunc';
import ArrowValidate from '../../Arrow/ArrowValidate';
import OffStyle from '../../helpers/ArrowFunc/Offstyle';


const RenameCategory = (props) => {

    const diagramm = props.diagramm.category

    const returnSetting = () => {
        window.history.back()
    }
    const funcValidText = (e) => {   // валидация ввода, только русские буквы
        const regex1 = /[^А-ЯЁа-яё]/
        const regexEng = /[A-Za-z]/
        if (regexEng.test(e.target.value)) {
            let Hedgehog= document.getElementById('myPopup')
            if (Hedgehog.classList.value===a.popuptext){
            HedgehogFunc(props.addText, 'Переключите на русский язык ...')
            }
        }
        e.target.value = e.target.value.replace(regex1, '')
    }

    const onSubmit = (values, form) => {

        if (values.name
            && !props.diagramm.category.map(a => a.nameRus.toLowerCase()).includes(values.name.toLowerCase())
            && isNaN(Number(values.name))
            && values.favorite) {
            props.renameCategory(values.favorite, values.name)
            HedgehogFunc(props.addText,
                `"${values.favorite}" переименована в  "${values.name}" ...`)

            OffStyle(['nameCategory','favorite'])
            props.nameCase(values.name) //добавление имени в винительном падеже ...
            form.reset()
        }

        else if (!values.favorite) {
            HedgehogFunc(props.addText, 'Выберите категорию из списка ...')
            ArrowFunc('arrowFavorite', 'favorite', 'buttonSetting')
        }
        else if (values.name && props.diagramm.category.map(a => a.nameRus.toLowerCase()).includes(values.name.toLowerCase())) {
            HedgehogFunc(props.addText, 'Категория ' + values.name + ' уже есть ...')
            ArrowFunc('arrowName', 'nameCategory', 'buttonSetting')
        }
        else if (!values.name) {
            HedgehogFunc(props.addText, 'Впишите новое название категории ...')
            ArrowFunc('arrowName', 'nameCategory', 'buttonSetting')
        }

    }
    return (
        <div>
            <div className={s.title}>Переименование категории</div>
            <div className={s.item}>
                <Form
                    onSubmit={onSubmit}
                    render={({ handleSubmit, form, submitting, pristine, values }) => (
                        <form onSubmit={handleSubmit} >

                            <div className={s.renameCategoryBloc}>
                                <div className={s.renameCategory}>

                                    <div className={s.nameArrow}>
                                        <div className={s.nameInput}>
                                            <label> Название категории: </label>
                                            <Field
                                                id="favorite"
                                                name="favorite"
                                                style={diagramm.map(a => a.nameRus).includes(values.favorite)
                                                    ? { backgroundColor: diagramm.filter(a => a.nameRus === values.favorite)[0].color }
                                                    : { backgroundColor: '#ffffff' }}
                                                component="select"
                                                className={s.option}
                                                autoFocus='on'>
                                                <option></option>
                                                {diagramm.map(a => {
                                                    if (a) return (
                                                        <option value={a.nameRus} key={a.nameRus}
                                                            style={{ backgroundColor: ` ${a.color}` }}>{a.nameRus}</option>)
                                                    else return null
                                                }
                                                )}
                                            </Field>
                                        </div>
                                        <ArrowValidate arrowId='arrowFavorite' />

                                    </div>
                                    <div className={s.nameArrow}>
                                        <div className={s.nameInput}>
                                            <label>Новое название категории: </label>
                                            <Field
                                            onInput={funcValidText}
                                                id='nameCategory'
                                                className={s.nameCategory}
                                                autoComplete="off"
                                                name="name"
                                                placeholder=""
                                                component="input"
                                                type="text"
                                                maxLength='20'
                                            />
                                        </div>

                                        <ArrowValidate arrowId='arrowName' />

                                    </div>
                                    <div>
                                        Уже имеющиеся категории:
                                        <div>
                                            <ul className={s.listCategory}>
                                                {props.diagramm.category.map(a =>
                                                    <li key={a.nameRus}>{a.nameRus}</li>
                                                )}
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className={s.instruction}>
                                    <div className={s.instructionTitle}>
                                        Чтобы переименовать категорию, следуйте ниже приведенным шагам:</div>
                                    <div>
                                        <div>1) В поле "Название категории" выберите категорию из выпадающего списка</div>
                                        <div>2) В поле "Новое название категории" впишите новое название категории<br></br>
                                        (Название не должно содержать цифры, содержать спецсимволы (. , ; № и т.д.),
                                            совпадать с уже имеющимися категориями и должно быть длинною до 20 символов)
                                        </div>
                                        <div>3) Нажмите кнопку "Переименовать категорию"</div>
                                    </div>

                                </div>
                            </div>

                            <div className={s.buttonItem}>
                                <button
                                     className='buttonSetting'
                                    type="submit"
                                    disabled={submitting || pristine}>
                                    Переименовать категорию
                                </button>
                                <button type="button" onClick={returnSetting}>
                                    Назад к настройкам
                                </button>
                            </div>
                        </form>
                    )}
                />
            </div>
        </div>
    )

}

export default RenameCategory