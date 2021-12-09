import React from 'react';
//import s from './Setting.module.css';
import { Switch, Route} from 'react-router-dom';
import AddCategory from './AddCategory/AddCategory';
import SettingNav from './SettingNav/SettingNav';
import DeleteCategory from './DeleteCategory/DeleteCategory';
import RenameCategory from './RenameCategory/RenameCategory';
import { connect } from 'react-redux';
import { addCategory,deleteCategory,renameCategory } from './../../../Redux/diagrammReducer';

const Setting =(props)=> {
    return (
<Switch>
<Route exact path='/setting' render={() => <SettingNav />} />
<Route path='/setting/AddCategory' render={() => <AddCategory diagramm={props.diagramm} addCategory={props.addCategory} />} />
<Route path='/setting/DeleteCategory' render={() => <DeleteCategory diagramm={props.diagramm} deleteCategory={props.deleteCategory}/>} />
<Route path='/setting/RenameCategory' render={() => <RenameCategory diagramm={props.diagramm} renameCategory={props.renameCategory}/>} />
       </Switch>
    )

}
let mapStateToProps = (state) => {
    return {
        diagramm: state.expenses
    }
}

export default connect (mapStateToProps, {addCategory, deleteCategory, renameCategory}) (Setting)