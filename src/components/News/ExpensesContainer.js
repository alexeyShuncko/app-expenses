import React, { useEffect, useState } from 'react';
import s from './ExpensesContainer.module.css';
import NavNews from './NavNews/NavNews';
import { Route, Routes } from 'react-router';
import Main from './Main/Main';
import Statistic from './Statistic/Statistic';
import Setting from './Setting/Setting';
import { connect } from 'react-redux';
import Hedgehog from './Hedgehog/Hedgehog';
// import Error from './helpers/Error/Error';
import Grafs from './Graphs/Graphs';
import DiagrammContainer from './Diagramm/DIagrammContainer';
import { DateFunc } from './helpers/DateFunc/DateFunc';
import {
    addTodayS, addTodayPo, addText, addActivHedgehog,
    categories, sources, salary, relativ
} from './../../Redux/diagrammReducer';
import AboutApp from './AboutApp/AboutApp';
import Login from './NavNews/Login/Login';


const ExpensesContainer = ({ addActivHedgehog, addText, categories, sources, salary, relativ, ...props }) => {

    let [init, setInit] = useState(false)

    useEffect(() => {
        if (!init) {
            addText('Привет...Чтобы моё собщение исчезло, кликните вне сообщения...') 
            addActivHedgehog(true) 
            setInit(true) 
            categories()  
            sources() 
            salary() 
            relativ() 
        }     
    }, []
    )

    const dateToday = new Date()
    if (props.diagramm.today.po !== DateFunc(dateToday)) {
        props.addTodayPo(DateFunc(dateToday))
        props.addTodayS(DateFunc(new Date(dateToday.setDate(dateToday.getDate() - 31))))
    }


    return (
        <div className={s.newsContainerItems}  >

            <div className={s.newsContainerNav}>
                <NavNews />
                <div className={s.hedgehog} >
                    <Hedgehog
                        addActivHedgehog={addActivHedgehog}
                        text={props.diagramm.text}
                        activHedgehog={props.diagramm.activHedgehog} />
                </div>
            </div>

            <div className={s.newsContainerContent}>

                <div>
                    <Routes>
                        <Route path='/main' element={<Main />} />
                        <Route path='/statistic' element={<Statistic />} />
                        <Route path='/graphs' element={<Grafs />} />
                        <Route path='/diagramm' element={<DiagrammContainer />} />
                        <Route path='/setting/*' element={<Setting />} />
                        <Route path='/about' element={<AboutApp />} />
                        <Route path='/' element={<Login />} /> 
                    </Routes>
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
export default connect(mapStateToProps, {
    addTodayS, addTodayPo, addText, addActivHedgehog,
    categories, sources, salary, relativ
})
    (ExpensesContainer)


