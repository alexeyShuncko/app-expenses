import React from 'react';
import s from './RenameCategory.module.css';
import { Field, Form } from 'react-final-form';
//import { withRouter } from 'react-router-dom';
import { useState } from 'react';



const RenameCategory = (props) => {

    let [valCategory, setValCategory] = useState(false)

    const diagramm = props.diagramm.category

    const returnSetting = () => {
        props.history.push('/setting')
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
        <div className={s.item}>
            <Form
                onSubmit={onSubmit}
                render={({ handleSubmit, form, submitting, pristine, values }) => (
                    <form onSubmit={handleSubmit} >
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
    )

}

export default RenameCategory