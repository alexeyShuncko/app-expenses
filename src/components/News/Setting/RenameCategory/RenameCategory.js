import React from 'react';
import s from './RenameCategory.module.css';
import { Field, Form } from 'react-final-form';
import HedgehogFunc from './../../helpers/HedgehodFunc/HedgehogFunc';
import arrow from '../../../../image/arrow1.png'


const RenameCategory = (props) => {

    const diagramm = props.diagramm.category

    const returnSetting = () => {
        window.history.back()
    }

    const onSubmit = (values, form) => {
        if (values.name
            && !props.diagramm.category.map(a => a.nameRus.toLowerCase()).includes(values.name.toLowerCase())
            && isNaN(Number(values.name))) {
            props.renameCategory(values.favorite, values.name)
            HedgehogFunc(props.addText,
                values.favorite + ' переименована в ' + values.name + ' ...')
                let error = document.getElementById('nameCategory')
                error.classList.remove(s.error)

            form.reset()
        }
        else if (props.diagramm.category.map(a => a.nameRus.toLowerCase()).includes(values.name.toLowerCase())) { 
            HedgehogFunc(props.addText, 'Категория ' + values.name + ' уже есть ...')
            let show = document.getElementById('arrow')
            show.classList.toggle(s.show)
            setTimeout(() => {
               show.classList.remove(s.show)
            }, 4000)
        }
        else if (!isNaN(Number(values.name))) {
             HedgehogFunc(props.addText, 'Название не должно состоять только из цифр ...') 
             let show = document.getElementById('arrow')
             show.classList.toggle(s.show)
             setTimeout(() => {
                show.classList.remove(s.show)
             }, 4000)
             let error = document.getElementById('nameCategory')
             error.classList.toggle(s.error)
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
                                        <Field
                                            name="favorite"
                                            style={diagramm.map(a => a.nameRus).includes(values.favorite)
                                                ? { backgroundColor: diagramm.filter(a => a.nameRus === values.favorite)[0].color }
                                                : { backgroundColor: '#ffffff' }}
                                            component="select"
                                            className={s.option}
                                            required>
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
                                    <div className={s.nameArrow}>
                                        <div className={s.nameInput}>
                                            <label>Новое название категории: </label>
                                            <Field
                                              id='nameCategory'
                                              className={s.nameCategory}
                                                autoComplete="off"
                                                name="name"
                                                placeholder=""
                                                component="input"
                                                type="text"
                                                required
                                            />
                                        </div>
                                       
                                        <div className={s.arrow}>
                                        <img  id='arrow' className={s.arrowImg} src={arrow} alt='Стрелка' />
                                        </div>
                                        
                                            
                                       
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
                                <button type="submit" disabled={submitting || pristine}>
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