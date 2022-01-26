import React from 'react';
import s from './ExpensesContainer.module.css';
import NavNews from './NavNews/NavNews';
import { Route, Routes} from 'react-router';
import Main from './Main/Main';
import Statistic from './Statistic/Statistic';
import Setting from './Setting/Setting';
import Graphs from './Graphs/Graphs';



const ExpensesContainer = (props) => {

    return (
        <div className={s.newsContainerItems}>

            <div className={s.newsContainerNav}><NavNews /></div>

            <div className={s.newsContainerContent}>
                <div>
                <Routes>
                    <Route path='/main' element={ <Main />} />
                    <Route path='/statistic' element={<Statistic />} />
                    <Route path='/setting/*' element={<Setting />} />
                    <Route path='/graphs' element={<Graphs />} />
                    <Route path='*'
                        render={() => <div>404 not found</div>} />
                </Routes>
                </div>
            </div>

        </div>
    )
}

export default ExpensesContainer

