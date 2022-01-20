import React from 'react';
//import s from './Setting.module.css';
import { Routes, Route } from 'react-router-dom';
import AddCategory from './AddCategory/AddCategory';
import SettingNav from './SettingNav/SettingNav';
import DeleteCategory from './DeleteCategory/DeleteCategory';
import RenameCategory from './RenameCategory/RenameCategory';

import { connect } from 'react-redux';
import { addCategory, deleteCategory, renameCategory, addEditColor } from './../../../Redux/diagrammReducer';
import Color from './Color/Color';





const Setting = (props) => {
    return (
        <Routes>
            <Route path='/' element={<SettingNav />} />

            <Route path='/AddCategory'
                element={<AddCategory diagramm={props.diagramm} addCategory={props.addCategory} />} />
            <Route path='/DeleteCategory'
                element={<DeleteCategory diagramm={props.diagramm} deleteCategory={props.deleteCategory} />} />
            <Route path='/RenameCategory'
                element={<RenameCategory diagramm={props.diagramm} renameCategory={props.renameCategory} />} />
            <Route path='/Color'
                element={<Color diagramm={props.diagramm} addEditColor={props.addEditColor} />} />

        </Routes>
    )

}
let mapStateToProps = (state) => {
    return {
        diagramm: state.expenses
    }
}

export default connect(mapStateToProps, 
    { addCategory, deleteCategory, renameCategory, addEditColor })(Setting)