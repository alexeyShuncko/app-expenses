import React from 'react';
import s from './ExpensesContainer.module.css';
import NavNews from './NavNews/NavNews';
import { Route, Routes} from 'react-router';
import Main from './Main/Main';
import Statistic from './Statistic/Statistic';
import Setting from './Setting/Setting';
import Graphs from './Graphs/Graphs';
import { connect } from 'react-redux';
import Hedgehog from './Hedgehog/Hedgehog';
import Error from './helpers/Error/Error';


const ExpensesContainer = (props) => {

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
                    <Route path='/setting/*' element={<Setting />} />
                    <Route path='/graphs' element={<Graphs />} />
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
export default connect(mapStateToProps)(ExpensesContainer)


