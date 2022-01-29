import React from 'react';
import s from './Relativity.module.css';
import { Form, Field } from 'react-final-form';


const Relativity = (props) => {

    const returnSetting = () => {
        window.history.back()
    }

    const onSubmit = (values, form) => {
       
     console.log(values)
        props.changeRelativity(values)
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
<div>
                               
                                <div  className={s.relativityBloc}>
                                    <label> Единицы измерения : </label>
                                    <Field className={s.relativityBlocField1}
                                        autoComplete="off"
                                        name="unit"
                                        component="select"
                                        required 
                                    >
                                        <option></option>
                                        <option>бутылка</option>
                                        <option>пачка</option>
                                        <option>литр</option>
                                        <option>киллограмм</option>
                                        <option>пара</option>
                                    </Field>
                                </div>
                                <div  className={s.relativityBloc}>
                                    <label> Название величины : </label>
                                    <Field className={s.relativityBlocField}
                                        autoComplete="off"
                                        name="name"
                                        placeholder={props.diagramm.relativity.name}
                                        component="input"
                                        type="text"
                                        required
                                    />
                                </div>
                                <div className={s.relativityBloc} >
                                    <label> Стоимость : </label>
                                    <Field className={s.relativityBlocField}
                                        autoComplete="off"
                                        name="price"
                                        placeholder={props.diagramm.relativity.price} 
                                        component="input"
                                        type="number"
                                        step="0.01"
                                        required
                                    />
                                </div>
                                </div>
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
                    <div>1) Из выпадающего списка "Единицы измерения" выберите в чем измеряется ваша величина</div>
                        <div>2) В поле "Название величины" впишите название в родительном падеже</div>
                        <div>(Например: муки "Лидская", носков "Mark Formelle", чая, минералки и т.д.)</div>
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