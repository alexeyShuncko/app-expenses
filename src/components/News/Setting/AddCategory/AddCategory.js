import React from 'react';
import { Form, Field } from 'react-final-form';
import s from './AddCategory.module.css';
import HedgehogFunc from './../../helpers/HedgehodFunc/HedgehogFunc';
import ArrowValidate from '../../Arrow/ArrowValidate';
import ArrowFunc from '../../helpers/ArrowFunc/ArrowFunc';
import OffStyle from '../../helpers/ArrowFunc/Offstyle';

const AddCategory = (props) => {

    const returnSetting = () => {
        window.history.back()
    }


    const onSubmit = (values) => {

        if (values.color !== '#ffffff' &&
            !props.diagramm.category.map(a => a.nameRus.toLowerCase()).includes(values.name.toLowerCase())
            && isNaN(Number(values.name))) {
            HedgehogFunc(props.addText, 'Категория ' + values.name + ' добавлена ...')
            props.addCategory(values.name, values.color)

            OffStyle(['nameAdd', 'addColor'])  // удаление класса, после успешного ввода у полей (красный фон)

            values.name = ''
            values.color = '#ffffff'
        }
        else if (!values.name) {
            HedgehogFunc(props.addText, 'Впишите название категории ...')
            ArrowFunc('arrowNameAdd', 'nameAdd', 'buttonAdd')
        }

        else if (!isNaN(Number(values.name))) {
            HedgehogFunc(props.addText, 'Название не должно состоять только из цифр ...')
            ArrowFunc('arrowNameAdd', 'nameAdd', 'buttonAdd')

        }
        else if (props.diagramm.category.map(a => a.nameRus.toLowerCase()).includes(values.name.toLowerCase())) {
            HedgehogFunc(props.addText, 'Категория ' + values.name + ' уже есть ...')
            ArrowFunc('arrowNameAdd', 'nameAdd', 'buttonAdd')
        }
        else if (values.color === '#ffffff') {
            HedgehogFunc(props.addText, 'Вы забыли выбрать цвет ...')
            ArrowFunc('colorAdd', 'addColor', 'buttonAdd')
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
                                                id='nameAdd'
                                                className={s.nameInput__field}
                                                autoComplete="off"
                                                name="name"
                                                component="input"
                                                type="text"
                                                maxLength='20'
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
                                        <span>{props.diagramm.category.map(a =>
                                            <span key={a.nameRus} className={s.legend} style={{ backgroundColor: ` ${a.color}` }}>&nbsp;</span>)}</span>
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
                                            (Название не должно состоять только из цифр,
                                            не должно совпадать с уже имеющимися категориями и должно быть длинною до 20 символов)</div>
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
                                    id='buttonAdd'
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