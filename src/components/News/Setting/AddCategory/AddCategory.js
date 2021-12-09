import React from 'react';
import { Form, Field } from 'react-final-form';
import s from './AddCategory.module.css';


const AddCategory = (props) => {

    const returnSetting = () => {
        props.history.push('/setting')
    }

    const onSubmit = (values, form) => {
        props.addCategory(values.name, values.color)
        form.reset()
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
                        </div>
                        <div className={s.colorInput}>
                            <label> Цвет: </label>
                            <Field className={s.color}
                                defaultValue="#ffffff"
                                name="color"
                                component="input"
                                type="color"
                            />
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

export default AddCategory