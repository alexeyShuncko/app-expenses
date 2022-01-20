import React from 'react';
import s from './Color.module.css';


const Color = (props) => {

    const returnSetting = () => {
        window.history.back()
    }

    const onSelectChange = (e) => {
        props.addEditColor(e.target.value, e.target.name)
    }

    return (
        <div className={s.changeСolor}>
            <div className={s.title}>Изменение цвета категории</div>
            <div>
                {props.diagramm.category.map(a =>
                    <div className={s.item} key={a.nameRus}>
                        <span className={s.itemName}>{a.nameRus} - </span>
                        <input name={a.nameRus} defaultValue={a.color} onChange={onSelectChange}
                            className={s.inputColorValue} type="color"></input>
                    </div>
                )
                }
            </div>
            <div className={s.button}>
                <button type="button" onClick={returnSetting}>
                    Назад к настройкам
                </button>
            </div>

        </div>
    )

}

export default Color