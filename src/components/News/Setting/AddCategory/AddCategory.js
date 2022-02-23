import React from 'react';
import { Form, Field } from 'react-final-form';
import s from './AddCategory.module.css';
import a from '../../Hedgehog/Hedgehog.module.css';
import HedgehogFunc from './../../helpers/HedgehodFunc/HedgehogFunc';
import ArrowValidate from '../../Arrow/ArrowValidate';
import ArrowFunc from '../../helpers/ArrowFunc/ArrowFunc';
import OffStyle from '../../helpers/ArrowFunc/Offstyle';

const AddCategory = (props) => {

    const returnSetting = () => {
        window.history.back()
    }

    const funcValidText = (e) => {    // валидация ввода, только русские буквы ... подумать над пробелом !!!!
        const regex1 = /[^А-ЯЁа-яё]/  //  и несколькими словами....
        const regexEng = /[A-Za-z]/
        if (regexEng.test(e.target.value)) {
            let Hedgehog = document.getElementById('myPopup')
            if (Hedgehog.classList.value === a.popuptext) {
                HedgehogFunc(props.addText, 'Переключите на русский язык ...')
            }
        }
        e.target.value = e.target.value.replace(regex1, '')
    }


    const onSubmit = (values) => {

        if (values.color !== '#ffffff' &&
            !props.diagramm.category.map(a => a.nameRus.toLowerCase()).includes(values.name.toLowerCase())
            && isNaN(Number(values.name))) {
            HedgehogFunc(props.addText, `Категория "${values.name}" добавлена ...`)
            props.addCategory(values.name, values.color)
            ArrowFunc(null, null, 'buttonSetting')
            OffStyle(['nameAdd', 'addColor'])  // удаление класса, после успешного ввода у полей (красный фон)
            //props.nameCase(values.name) // добавление имени в винительном падеже
            values.name = ''
            values.color = '#ffffff'
        }
        else if (!values.name) {
            HedgehogFunc(props.addText, 'Впишите название категории ...')
            ArrowFunc('arrowNameAdd', 'nameAdd', 'buttonSetting')
        }
        else if (props.diagramm.category.map(a => a.nameRus.toLowerCase()).includes(values.name.toLowerCase())) {
            HedgehogFunc(props.addText, 'Категория ' + values.name + ' уже есть ...')
            ArrowFunc('arrowNameAdd', 'nameAdd', 'buttonSetting')
        }
        else if (values.color === '#ffffff') {
            HedgehogFunc(props.addText, 'Вы забыли выбрать цвет ...')
            ArrowFunc('colorAdd', 'addColor', 'buttonSetting')
        }
    }
    return (
        <div>
            <div className={s.title}>Добавление категории</div>
            <div className={s.item}>

                <Form
                    onSubmit={onSubmit}
                    render={({ handleSubmit, form, submitting, pristine, values }) => (
                        <form onSubmit={handleSubmit} >

                            <div className={s.addCategoryBloc}>
                                <div className={s.addCategory}>
                                    <div className={s.nameArrow}>
                                        <div className={s.nameInput}>
                                            <label> Название категории: </label>
                                            <Field
                                                onInput={funcValidText}
                                                id='nameAdd'
                                                className={s.nameInput__field}
                                                autoComplete="off"
                                                name="name"
                                                component="input"
                                                type="text"
                                                maxLength='12'
                                                autoFocus='on' />

                                        </div>
                                        <ArrowValidate arrowId='arrowNameAdd' />
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
                                    <div>
                                        <span>Уже используемые цвета: </span>
                                       { props.diagramm.category.length < 7
                                       ? <span>{props.diagramm.category.map(a =>
                                            <span
                                                key={a.nameRus}
                                                className={s.legend}
                                                style={{ backgroundColor: ` ${a.color}` }}>&nbsp;
                                            </span>)}
                                        </span>
                                        : <div>{props.diagramm.category.map(a =>
                                            <span
                                                key={a.nameRus}
                                                className={s.legend}
                                                style={{ backgroundColor: ` ${a.color}` }}>&nbsp;
                                            </span>)}
                                        </div>}
                                    </div>
                                    <div className={s.colorInput}>
                                        <label> Цвет:</label>
                                        <Field
                                            id='addColor'
                                            className={s.color}
                                            name="color"
                                            component="input"
                                            type="color"
                                            defaultValue='#ffffff' />

                                        <ArrowValidate arrowId='colorAdd' />

                                    </div>
                                </div>
                                <div className={s.instruction}>
                                    <div className={s.instructionTitle}>
                                        Чтобы добавить категорию, следуйте ниже приведенным шагам:</div>
                                    <div>
                                        <div>1) В поле "Название категории" впишите название новой категории <br></br>
                                            (Название не должно содержать цифры, содержать спецсимволы (. , ; № и т.д.),
                                            совпадать с уже имеющимися категориями и должно быть длинною до 20 символов)</div>
                                        <div>2) Нажмите на белый  квадрат рядом с полем "Цвет"</div>
                                        <div>3) Выберите нужный тебе цвет <br></br>
                                            (Цвет не должен совпадать с уже используемыми цветами, для визуального отличия категорий)</div>
                                        <div>4) Нажмите в любое место экрана, кроме окна выбора цвета</div>
                                        <div>5) Нажмите кнопку "Добавить категорию"</div>
                                    </div>

                                </div>
                            </div>



                            <div className={s.buttonItem}>
                                <button
                                    className='buttonSetting'
                                    type="submit"
                                    disabled={submitting || pristine}>
                                    Добавить категорию
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

export default AddCategory