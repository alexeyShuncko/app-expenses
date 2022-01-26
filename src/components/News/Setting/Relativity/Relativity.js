import React from 'react';
import s from './Relativity.module.css';
import { Form, Field } from 'react-final-form';


const Relativity = (props) => {

    const returnSetting = () => {
        window.history.back()
    }

    const onSubmit = (values, form) => {
        console.log(values)
        form.reset()
    }

    return (
        <div className={s.mainRelativity}>
            <div className={s.title}>Добавление относительной величины</div>
            <div className={s.RelativityBloc}>
                <div className={s.Relativity}>
                    <Form
                        onSubmit={onSubmit}
                        render={({ handleSubmit, form, submitting, pristine, values }) => (
                            <form onSubmit={handleSubmit} >
                                {props.diagramm.relativity.map(a =>
                                    <div key={a.nameRus}>
                                        <label> {a.nameRus} : </label>
                                        <Field
                                            autoComplete="off"
                                            name={a.nameRus}
                                            placeholder={a.value}
                                            component="input"
                                            type="text"
                                            required
                                        />
                                    </div>)}
                                <div className={s.button}>
                                    <button type="submit" 
                                    disabled={submitting || pristine}
                                    >
                                        Добавить величину
                                    </button>
                                    <span>
                                    <button type="button" onClick={returnSetting}>
                                        Назад к настройкам
                                    </button>
                                    </span>                                   
                                </div>

                            </form>
                        )}
                    />

                </div>
                <div className={s.instruction}>
                    <div className={s.instructionTitle}>
                        Чтобы добавить относительную величину следуй ниже приведенным шагам:</div>
                    <div>
                        <div>1) В поле "Название" впишите название в родительном падеже(пример...)</div>
                        <div>2) В поле "Единицы измерения" впишите в чем измеряется ваша величина
                            <div>(штука, киллограмм, бутылка, порция и т.д)</div>
                            </div>
                        <div>3) В поле "Стоимость" впишите стоимость за одну единицу вашей величины в бел. рублях</div>
                        <div>4) Нажмите кнопку добавить величину
                            <div>(увидеть пересчёт ваших расходов в относительную величину вы можете на странице "Статистика", выбрав категорию)</div>
                            </div>
                    </div>

                </div>
            </div>

        </div>
    )

}

export default Relativity