import React from 'react';
import { useState } from 'react';
import { Form, Field } from 'react-final-form';
import { withRouter } from 'react-router-dom';
import s from './AddCategory.module.css';


const AddCategory = (props) => {

    let [valColor, setValColor] = useState(false)
    let [valCategory, setValCategory] = useState(false)

    const activeVal = () => {
        setValColor(true)
    }
    const deactiveVal = () => {
        setValColor(false)
    }
    const returnSetting = () => {
        props.history.push('/setting')
    }

    const onSubmit = (values, form) => {
        if (values.color !== '#ffffff' &&  
        !props.diagramm.category.map(a=> a.nameRus.toLowerCase()).includes(values.name.toLowerCase())) {
            deactiveVal()
            setValCategory(false)
            props.addCategory(values.name, values.color)
            form.reset()
        }
        else if (values.color === '#ffffff') {activeVal()}
        else if (props.diagramm.category.map(a=> a.nameRus.toLowerCase()).includes(values.name.toLowerCase())) {setValCategory(true)}
    }
    return (
        <div className={s.item}>
            <Form
                onSubmit={onSubmit}
                render={({ handleSubmit, form, submitting, pristine, values }) => (
                    <form onSubmit={handleSubmit} >
                        <div className={s.nameInput}>
                            <label> Название категории: </label>
                            <Field
                                autoComplete="off"
                                name="name"
                                placeholder=""
                                component="input"
                                type="text"
                                required
                            />
                            {/* <span>(Название не должно состоять только из цифр)</span> */}
                            {valCategory && <span className={s.validColor}>Такая категория уже есть</span>}
                        </div>
                        <div className={s.colorInput}>
                            <label> Цвет: </label>
                            <Field onClick={deactiveVal}
                                className={s.color}
                                defaultValue="#ffffff"
                                name="color"
                                component="input"
                                type="color"
                            />
                            {valColor && <span className={s.validColor}>Выбери цвет</span>}
                        </div>
                        <div className={s.buttonItem}>
                            <button type="submit"
                                disabled={submitting || pristine} //сделать видимой невидимой
                            >
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
    )

}

export default withRouter(AddCategory)