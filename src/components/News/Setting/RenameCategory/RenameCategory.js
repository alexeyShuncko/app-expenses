import React from 'react';
import s from './RenameCategory.module.css';
import { Field, Form } from 'react-final-form';
import { useState } from 'react';



const RenameCategory = (props) => {

    let [valCategory, setValCategory] = useState(false)

    const diagramm = props.diagramm.category

    const returnSetting = () => {
        window.history.back()
    }

    const onSubmit = (values, form) => {
        if (values.name &&
            !props.diagramm.category.map(a => a.nameRus.toLowerCase()).includes(values.name.toLowerCase())) {
            setValCategory(false)
            props.renameCategory(values.favorite, values.name)
            form.reset()
        }
        else if (props.diagramm.category.map(a => a.nameRus.toLowerCase()).includes(values.name.toLowerCase())) {
            setValCategory(true)
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
                                    <div className={s.nameInput}>
                                        <label> Название категории: </label>
                                        <Field name="favorite"
                                            style={diagramm.map(a => a.nameRus).includes(values.favorite)
                                                ? { backgroundColor: diagramm.filter(a => a.nameRus === values.favorite)[0].color }
                                                : { backgroundColor: 'ffffff' }}
                                            component="select" className={s.option} required
                                        >
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
                                    <div className={s.nameInput}>
                                        <label>Новое название категории: </label>
                                        <Field
                                            autoComplete="off"
                                            name="name"
                                            placeholder=""
                                            component="input"
                                            type="text"
                                            required
                                        />
                                        {valCategory && <span className={s.validColor}>Такая категория уже есть</span>}
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
                                        Чтобы переименовать категорию следуй ниже приведенным шагам:</div>
                                    <div>
                                        <div>1) В поле "Название категории" выбери категорию из выпадающего списка</div>
                                        <div>2) В поле "Новое название категории" впиши новое название категории<br></br>
                                        (Название не должно состоять только из цифр, а также не должно совпадать с уже имеющимися категориями)
                                        </div>
                                        <div>3) Нажми кнопку "Переименовать категорию"</div>
                                    </div>

                                </div>
                            </div>


                            <div className={s.buttonItem}>
                                <button type="submit"
                                    disabled={submitting || pristine} //сделать видимой невидимой
                                >
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