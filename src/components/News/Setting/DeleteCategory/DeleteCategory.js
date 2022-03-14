import React from 'react';
import { Form } from 'react-final-form';
import s from './DeleteCategory.module.css';
import { Field } from 'react-final-form';




const DeleteCategory = (props) => {

    const diagramm = props.diagramm.category

    const returnSetting = () => {
        window.history.back()
    }

    const onSubmit = (values, form) => {
        
        props.deleteCategory(values.favorite)

        props.addText(`Категория "${values.favorite}" удалена ...`)
        props.addActivHedgehog(true)

        props.addActiv('')
         form.reset()
    }
    return (

        <div>
            <div className={s.title}>Удаление категории</div>
            <Form
                onSubmit={onSubmit}
                render={({ handleSubmit, submitting, pristine, values }) => (
                    <form onSubmit={handleSubmit} >
                        <div className={s.deleteCategoryBloc}>
                            <div className={s.deleteCategory}>
                                <label> Название категории: </label>
                                <Field
                                    autoFocus='on'
                                    name="favorite"
                                    style={{ backgroundColor: ` ${values.favorite  
                 ? diagramm.find(a => a.nameRus === values.favorite).color : '#ffffff' } `}}
                                    component="select"
                                    className={s.option}
                                >
                                    <option></option>
                                    {diagramm.map(a => {
                                        if (a) return (
                                            <option
                                                value={a.nameRus}
                                                key={a.nameRus}
                                                style={{ backgroundColor: ` ${a.color}` }}>{a.nameRus}</option>)
                                        else return null
                                    }
                                    )}
                                </Field>
                            </div>
                            <div className={s.instruction}>
                                <div className={s.instructionTitle}>
                                    Чтобы удалить категорию, следуйте ниже приведенным шагам:</div>
                                <div>
                                    <div>1) В поле "Название категории" выберите из выпадающего списка необходимую категорию</div>
                                    <div>2) Нажмите кнопку "Удалить категорию"</div>
                                </div>
                            </div>
                        </div>

                        <div className={s.buttonItem}>
                            <button
                                type="submit"
                                disabled={submitting || pristine}>
                                Удалить категорию
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

export default DeleteCategory