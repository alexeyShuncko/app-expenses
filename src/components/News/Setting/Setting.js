import React from 'react';
//import s from './Setting.module.css';
import { Routes, Route } from 'react-router-dom';
import AddCategory from './AddCategory/AddCategory';
import SettingNav from './SettingNav/SettingNav';
import DeleteCategory from './DeleteCategory/DeleteCategory';
import RenameCategory from './RenameCategory/RenameCategory';

import { connect } from 'react-redux';
import {
    addCategory, deleteCategory, renameCategory,
    addEditColor, changeRelativity, addText, addActiv, nameCase,
    nameCaseRelativity, addSalaryDay, addActivHedgehog
} from './../../../Redux/diagrammReducer';
import Color from './Color/Color';
import Relativity from './Relativity/Relativity';
import AddSalaryDate from './AddSalaryDate/AddSalaryDate';





const Setting = (props) => {
    return (
        <Routes>
            <Route path='/' element={<SettingNav />} />

            <Route path='/AddCategory'
                element={<AddCategory diagramm={props.diagramm} addCategory={props.addCategory}
                    addText={props.addText} nameCase={props.nameCase} addActivHedgehog={props.addActivHedgehog} />} />
            <Route path='/DeleteCategory'
                element={<DeleteCategory diagramm={props.diagramm} deleteCategory={props.deleteCategory}
                    addText={props.addText} addActiv={props.addActiv} addActivHedgehog={props.addActivHedgehog} />} />
            <Route path='/RenameCategory'
                element={<RenameCategory diagramm={props.diagramm} renameCategory={props.renameCategory}
                    addText={props.addText} nameCase={props.nameCase} addActivHedgehog={props.addActivHedgehog} />} />
            <Route path='/Color'
                element={<Color diagramm={props.diagramm} addEditColor={props.addEditColor}
                    addText={props.addText} addActivHedgehog={props.addActivHedgehog} />} />
            <Route path='/Relativity'
                element={<Relativity diagramm={props.diagramm} changeRelativity={props.changeRelativity}
                    addText={props.addText} nameCaseRelativity={props.nameCaseRelativity}
                    addActivHedgehog={props.addActivHedgehog} />} />
            <Route path='/AddSalaryDate'
                element={<AddSalaryDate addSalaryDay={props.addSalaryDay} addText={props.addText}
                    addActivHedgehog={props.addActivHedgehog} />} />


        </Routes>
    )

}
let mapStateToProps = (state) => {
    return {
        diagramm: state.expenses
    }
}

export default connect(mapStateToProps,
    {
        addCategory, deleteCategory, renameCategory,
        addEditColor, changeRelativity, addText,
        addActiv, nameCase, nameCaseRelativity, addSalaryDay, addActivHedgehog
    })(Setting)