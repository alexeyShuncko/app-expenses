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
            <div className={s.changeСolorBloc}>
                <div className={s.changeСolor}>
                {props.diagramm.category.map(a =>
                    <div className={s.item} key={a.nameRus}>
                             <input name={a.nameRus} defaultValue={a.color} onChange={onSelectChange}
                            className={s.inputColorValue} type="color"></input>
                        <span className={s.itemName}> - {a.nameRus}</span>
                   
                    </div>
                )
                }
                </div>
                <div className={s.instruction}>
                   <div className={s.instructionTitle}>
                       Чтобы изменить цвет категории следуй ниже приведенным шагам:</div>
                   <div>
                   <div>1) Нажми на цветной квадрат рядом с названием категории</div>
                   <div>2) Выбери нужный тебе цвет</div>
                   <div>3) Нажми в любое место экрана, кроме окна выбора цвета и изменение цвета применится.</div>
                   </div> 
                  
                </div>
                
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