import React from 'react';
import s from './RenameCategory.module.css';
import { Field, Form } from 'react-final-form';



const RenameCategory =(props)=> {
  
    const diagramm = props.diagramm.category

    const returnSetting = () => {
        props.history.push('/setting')
    }

    const onSubmit = (values, form) => {
        props.renameCategory(values.favorite,values.name)
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
                            <Field  name="favorite" 
                                component="select" className={s.option} required
                                   >
                                    <option>{props.diagramm.activ} </option>
                                    {diagramm.map(a=>
                                    {if (a)  return (
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

export default (RenameCategory)