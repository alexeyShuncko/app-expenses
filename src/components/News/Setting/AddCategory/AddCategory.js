import React from 'react';
import { useState } from 'react';
import { Form, Field } from 'react-final-form';
import s from './AddCategory.module.css';
import HedgehogFunc from './../../helpers/HedgehodFunc/HedgehogFunc';


const AddCategory = (props) => {

    let [valColor, setValColor] = useState(false)
    let [valCategory, setValCategory] = useState(false)

    // const activeVal = () => {
    //     setValColor(true)
    // }
    const deactiveVal = () => {
        setValColor(false)
    }

    const returnSetting = () => {
        window.history.back()
    }

   

    const onSubmit = (values) => {
        if (values.color !== '#ffffff' &&
            !props.diagramm.category.map(a => a.nameRus.toLowerCase()).includes(values.name.toLowerCase())) {
            deactiveVal()
            HedgehogFunc(props.addText,'Категория '+ values.name + ' добавлена')
            setValCategory(false)
            
            props.addCategory(values.name, values.color)
            values.name = '' 
            values.color = '#ffffff'
        }
        //else if (values.color === '#ffffff') { activeVal() }
        else if (values.color === '#ffffff') { HedgehogFunc(props.addText,'Вы забыли выбрать цвет ...') }
        else if (props.diagramm.category.map(a => a.nameRus.toLowerCase()).includes(values.name.toLowerCase())) 
        { HedgehogFunc(props.addText,'Категория '+ values.name + ' уже есть') }
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
                                   
                                    <div className={s.nameInput}>
                                        <label> Название категории: </label>
                                        <Field
                                        className={s.nameInput__field}
                                            autoComplete="off"
                                            name="name"
                                            component="input"
                                            type="text"
                                            required
                                        />
                                        {typeof (values.name) === Number ? <span>(Название не должно состоять только из цифр)</span> : null}
                                        {valCategory && <span className={s.validColor}>Такая категория уже есть</span>}
                                    </div>
                                    <div>
                                        Уже имеющиеся категории:
                                        <div>
                                           <ul className={s.listCategory}>
                                           {props.diagramm.category.map(a =>  
                                                <li  key={a.nameRus}>{a.nameRus}</li>
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
                                        <Field onClick={deactiveVal}
                                            className={s.color}
                                            name="color"
                                            component="input"
                                            type="color"
                                            defaultValue='#ffffff'
                                        />
                                        {valColor && <span className={s.validColor}>Выбери цвет</span>}
                                    </div>
                                </div>
                                <div className={s.instruction}>
                                    <div className={s.instructionTitle}>
                                        Чтобы добавить категорию следуй ниже приведенным шагам:</div>
                                    <div>
                                        <div>1) В поле "Название категории" впиши название новой категории <br></br>
                                            (Название не должно состоять только из цифр, а также не должно совпадать с уже имеющимися категориями)</div>
                                        <div>2) Нажми на белый  квадрат рядом с полем "Цвет"</div>
                                        <div>3) Выбери нужный тебе цвет <br></br>
                                            (Цвет не должен совпадать с уже используемыми цветами, для визуального отличия категорий)</div>
                                        <div>4) Нажми в любое место экрана, кроме окна выбора цвета</div>
                                        <div>5) Нажми кнопку "Добавить категорию"</div>
                                    </div>

                                </div>
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