import React from 'react';
import s from './ExpensesContainer.module.css';
import NavNews from './NavNews/NavNews';
import { Route, Routes} from 'react-router';
import Main from './Main/Main';
import Statistic from './Statistic/Statistic';
import Setting from './Setting/Setting';
import { connect } from 'react-redux';
import Hedgehog from './Hedgehog/Hedgehog';
import Error from './helpers/Error/Error';
import Grafs from './Graphs/Graphs';
import DiagrammContainer from './Diagramm/DIagrammContainer';
import { DateFunc } from './helpers/DateFunc/DateFunc';
import { addTodayS, addTodayPo } from './../../Redux/diagrammReducer';


const ExpensesContainer = (props) => {

    const dateToday = new Date()
    if (props.diagramm.today.po !== DateFunc(dateToday)) {
        console.log('тут')
        props.addTodayPo(DateFunc(dateToday))
        props.addTodayS(DateFunc(new Date(dateToday.setDate(dateToday.getDate() - 31))))
    }
    

    return (
        <div className={s.newsContainerItems}>

            <div className={s.newsContainerNav}>
                <div className={s.NavNews}><NavNews /></div>
                <div className={s.hedgehog}><Hedgehog 
                diagramm={props.diagramm}
                /></div>
                </div>

            <div className={s.newsContainerContent}>
                <div>
                <Routes>
                    <Route path='/main' element={ <Main />} />
                    <Route path='/statistic' element={<Statistic />} />
                    <Route path='/graphs' element={<Grafs />} />
                    <Route path='/diagramm' element={<DiagrammContainer />} />
                    <Route path='/setting/*' element={<Setting />} />
                    <Route path='/' element={<Error />}/>
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
export default connect(mapStateToProps, {addTodayS, addTodayPo})(ExpensesContainer)


