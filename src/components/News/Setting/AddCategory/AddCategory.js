import React from 'react';
import { useState } from 'react';
import { Form, Field } from 'react-final-form';
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
       window.history.back()
    }

    const onSubmit = (values, form) => {
       console.log(values)
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
<div>
        <div className={s.title}>Добавление категории</div>
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
                           {typeof(values.name) === Number ? <span>(Название не должно состоять только из цифр)</span> : null}
                            {valCategory && <span className={s.validColor}>Такая категория уже есть</span>}
                        </div>
                        <div>
                            <span>Уже используемые цвета: </span>
                            <span>{props.diagramm.category.map(a=> 
                            <span key={a.nameRus} className={s.legend} style={{ backgroundColor: ` ${a.color}` }}>&nbsp;</span>)}</span>
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
        </div>
    )

}

export default AddCategory