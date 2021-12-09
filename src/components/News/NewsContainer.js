import React from 'react';
import s from './NewsContainer.module.css';
import NavNews from './NavNews/NavNews';

import { Route, Switch} from 'react-router';
import News from './News/News';
import Statistic from './Statistic/Statistic';
import Setting from './Setting/Setting';


const NewsContainer = (props) => {

    return (
        <div className={s.newsContainerItems}>

            <div className={s.newsContainerNav}><NavNews /></div>

            <div className={s.newsContainerContent}>
                <div>
                <Switch>
                    <Route path='/main' render={() => <News />} />
                    <Route path='/statistic' render={() => <Statistic />} />
                    <Route path='/setting' render={() => <Setting />} />
                    <Route path='*'
                        render={() => <div>404 not found</div>} />
                </Switch>
                </div>
            </div>

        </div>
    )
}

export default NewsContainer

