import React from 'react';
import { Form } from 'react-final-form';
import s from './DeleteCategory.module.css';
import { Field } from 'react-final-form';
import  HedgehogFunc  from '../../helpers/HedgehodFunc/HedgehogFunc';





const DeleteCategory = (props) => {

    const diagramm = props.diagramm.category

    const returnSetting = () => {
        window.history.back()
    }

    const onSubmit = (values, form) => {
        HedgehogFunc(props.addText,'Категория ' + values.favorite + ' удалена')
        props.deleteCategory(values.favorite)
        props.addActiv('')
        form.reset()
    }
    return (

        <div>
            <div className={s.title}>Удаление категории</div>
            <div className={s.item}>
                <Form
                    onSubmit={onSubmit}
                    render={({ handleSubmit, form, submitting, pristine, values }) => (
                        <form onSubmit={handleSubmit} >
                            <div className={s.deleteCategoryBloc}>
                                <div className={s.nameInput}>
                                    <label> Название категории: </label>
                                    <Field
                                        name="favorite" style={diagramm.map(a => a.nameRus).includes(values.favorite)
                                            ? { backgroundColor: diagramm.filter(a => a.nameRus === values.favorite)[0].color }
                                            : { backgroundColor: '#ffffff' }}
                                        component="select" className={s.option}
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
                                <div className={s.instruction}>
                   <div className={s.instructionTitle}>
                       Чтобы удалить категорию следуй ниже приведенным шагам:</div>
                   <div>
                   <div>1) В поле "Название категории" выбери из выпадающего списка необходимую категорию</div>
                   <div>2) Нажми кнопку "Удалить категорию"</div>
                   </div> 
                  
                </div>
                            </div>


                            <div className={s.buttonItem}>
                                <button type="submit"
                                    disabled={submitting || pristine} //сделать видимой невидимой
                                >
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
        </div>
    )

}

export default DeleteCategory