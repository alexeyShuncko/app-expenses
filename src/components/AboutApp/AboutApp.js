import React, { useEffect, useState } from 'react';
import s from './AboutApp.module.css';
import { connect } from 'react-redux';
import { addText, addActivHedgehog } from '../../Redux/diagrammReducer';
import { Button, Form, Select } from 'antd';
import DateAnt from '../helpers/Date/DateAnt';


const AboutApp = ({ addText, addActivHedgehog, ...props }) => {


    const [edit, setEdit] = useState(false)
    const [arrTest, setArrTest] = useState([])


    useEffect(() => {
        funcArr()
    }, [])


    const aboutFunc = () => {
        //addText('Вот более подробная информация ...')
        //addActivHedgehog(true)
        setEdit(true)
    }
    const aboutFuncOff = () => {
        addText('Я спрятал подробности ...')
        addActivHedgehog(true)
        setEdit(false)
    }



    // Побуквенный вывод
    const strTest = 'Основные тонкости: '

    const funcArr = () => {
        let arr = []
        for (let letter = 0; letter < strTest.length; letter++) {
            const element = strTest[letter];

            setTimeout(() => {
                setArrTest([...arr, element])
                arr.push(element)
            }, 100 * (letter + 7))
        }
    }





    return (
        <div className={s.about}>

            <div className={s.aboutDescript}>
                Приложение предназначено для учета Ваших доходов и расходов,
                а также для подробного отображения статистики по ним.
                Вся информация представлена в виде таблиц, диаграмм, графиков
                для удобства просмотра и анализа доходов и расходов за разные периоды времени.
                Основной единицей измерения доходов/расходов является беллоруский рубль
                <span className={s.spanBold}> (BYN)</span>.
                <div>
                    {!edit
                        ? <Button type='primary' onClick={aboutFunc} >Подробнее ...</Button>

                        : <div>
                            <Button type='primary' danger onClick={aboutFuncOff} >Меньше подробностей ...</Button>

                            <div className={s.page}>
                                <span className={s.spanBold}>"Главная" -</span> на этой вкладке представлены:
                                <ul>
                                    <li>Напоминание о получении зарплаты и/или аванса,
                                        при установленной дате зарплаты и/или аванса во вкладке "Настройки"</li>
                                    <li> Основная информация по всем доходам и расходам за всё время
                                        и их разница в поле "Баланс". По умолчанию в бел.руб. </li>
                                    <li>Кнопка для ввода доходов. Нажав на неё, появятся необходимые
                                        для заполнения поля для добавления доходов.
                                    </li>
                                    <li>Кнопка для ввода расходов. Нажав на неё, появятся необходимые
                                        для заполнения поля для добавления расходов. Возможно добавление
                                        расходов сразу по нескольким категориям.</li>
                                    <li>Курсы валют на сегодняшнюю дату по НБРБ.</li>
                                    <li>Диаграмма расходов за всё время. По умолчанию в бел.руб. </li>

                                </ul>
                            </div>
                            <div className={s.page}>
                                <span className={s.spanBold}>"Статистика" -</span> на этой вкладке представлены:
                                <ul>
                                    <li>Поле для выбора категории расходов.</li>
                                    <li>Пересчет расходов по выбранной категории в относительную величину.</li>
                                    <li> Поля для выбора периода времени.</li>
                                    <li>Таблица расходов по выбранной категории за выбранный период времени.
                                        Отображается при выбранной категории и нажатой кнопке "Показать".
                                        Сумма расходов в таблице в бел.руб. Итоговая сумма за выбранный
                                        период по умолчанию в бел.руб.
                                    </li>
                                    <li>Таблица расходов/доходов по всем категориям/доходам за выбранный
                                        период времени. Отображается при нажатой кнопке "Показать".
                                        Рядом с каждой строкой таблицы красный крестик, нажав на который
                                        произойдет удаление этой записи.
                                        Сумма расходов/доходов в таблице в бел.руб. Итоговая сумма  расходов/доходов
                                        за выбранный период по умолчанию в бел.руб.
                                    </li>
                                </ul>
                            </div>
                            <div className={s.page}>
                                <span className={s.spanBold}>"График" -</span> на этой вкладке представлены:
                                <ul>
                                    <li>График расходов/доходов с выбором валюты расходов/доходов и выбором
                                        периода времени. По умолчанию данные в бел.руб.
                                    </li>

                                </ul>
                            </div>
                            <div className={s.page}>
                                <span className={s.spanBold}>"Диаграмма" -</span> на этой вкладке представлены:
                                <ul>
                                    <li>Диаграмма расходов/доходов с выбором валюты расходов/доходов и
                                        выбором периода времени. По умолчанию данные в бел.руб.
                                    </li>

                                </ul>
                            </div>
                            <div className={s.page}>
                                <span className={s.spanBold}>"Настройки" -</span> на этой вкладке представлены:
                                <ul>
                                    <li>Кнопка для добавления категории расходов.
                                        Нажав на неё, появятся необходимые для заполнения поля.
                                    </li>
                                    <li>Кнопка для удаления категории расходов.
                                        Нажав на неё, появятся необходимые для заполнения поля.
                                    </li>
                                    <li>Кнопка для переименования категории расходов.
                                        Нажав на неё, появятся необходимые для заполнения поля.
                                    </li>
                                    <li>Кнопка для изменения цвета  категорий расходов.
                                        Нажав на неё, появятся необходимые для заполнения поля.
                                    </li>
                                    <li>Кнопка для добавления относительной величины. Нажав на неё, появятся
                                        необходимые для заполнения поля. Относительная величина, величина в которую
                                        будут пересчитываться Ваши расходы на вкладке "Статистика" для сравнения.
                                    </li>
                                    <li>Кнопка для добавления/изменения даты зарплаты и/или аванса.
                                        Нажав на неё, появятся необходимые для заполнения поля. Добавив дату
                                        зарплаты и/или аванса, приложение будет автоматически напоминать
                                        о получении зарплаты и/или аванса на вкладке "Главная".
                                    </li>

                                </ul>
                            </div>
                            <div className={s.page}>
                                <span className={s.spanBold}>"Учётная запись" -</span> на этой вкладке представлены:
                                <ul>
                                    <li>Ваше имя, с возможностью его изменения.</li>
                                    <li>Ваш емаил, с возможностью его изменения.</li>
                                    <li>Кнопка выхода из учётной записи (логаут).</li>
                                </ul>
                            </div>
                        </div>
                    }

                </div>
            </div>
            <div className={s.aboutInform}>
                <div className={s.spanBold}>

                    <span>{arrTest.join('')}</span>
                    <span className={s.cursor}>|</span>
                </div>
                <div className={s.aboutInformItem} style={{ '--i': 1 }}>
                    - Информация во вкладке "Статистика", "График", "Диаграмма" по умолчанию
                    предоставлена за последние <span className={s.spanBold}>33 дня. </span>
                    Изменить период вы можете нажав на поле даты <DateAnt
                        period={props.diagramm.period[0]}
                        s={props.diagramm.today.s}
                        po={props.diagramm.today.po} /> и выбрав необходимую Вам дату.
                </div>
                <div className={s.aboutInformItem} style={{ '--i': 2 }}>
                    - Элементы со стрелкой рядом, такие как:
                    <select
                        className={s.select}
                        defaultValue='расходов'>
                        <option>расходов</option>
                        <option>доходов</option>
                    </select> ,
                    <select
                        className={s.select}
                        defaultValue='BYN'>
                        <option>BYN</option>
                        <option>USD</option>
                        <option>EUR</option>
                        <option>RUB</option>
                    </select>

                    <Form.Item className={s.list}
                        style={{ marginBottom: 0, marginRight: 5 }}
                        wrapperCol={{ span: 24 }}>
                        <Select defaultValue='Зарплата'>
                            <Select.Option value='Зарплата'>Зарплата</Select.Option >
                            <Select.Option value='Аванс'>Аванс</Select.Option >
                        </Select>
                    </Form.Item>


                    , явлюются выпадающими списками.
                    Выбирая элемент из списка, вы меняете формат отображаемой информации.
                </div>

                <div className={s.aboutInformItem} style={{ '--i': 3 }}>
                    - Ёж в левом нижнем углу является Вашим помощником, коментирующим Ваши действия в приложении.
                    Сообщение ежа исчезает при нажатии вне сообщения.
                    Увидеть последнее сообщение можно, нажав на самого ежа.
                </div>
                <div className={s.aboutInformItem} style={{ '--i': 4 }}>
                    - Во вкладке "Настройки" Вы можете добавить дату зарплаты и/или аванса,
                    и приложение будет автоматически напоминать Вам о получении зарплаты и/или аванса
                    на вкладке "Главная". По умолчанию даты не установлены.
                </div>
                <div className={s.aboutInformItem} style={{ '--i': 5 }}>
                    - Удаление записей возможно во вкладке "Статистика", по нажатию красного крестика
                    рядом со строками общей таблицы.
                </div>
            </div>
        </div>
    )

}

let mapStateToProps = (state) => {
    return {
        diagramm: state.expenses
    }
}

export default connect(mapStateToProps, { addText, addActivHedgehog })(AboutApp) 