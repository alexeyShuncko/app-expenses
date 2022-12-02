import React from 'react';
//import s from './Setting.module.css';
import { Routes, Route } from 'react-router-dom';
import AddCategory from './AddCategory/AddCategory';
import SettingNav from './SettingNav/SettingNav';
import DeleteCategory from './DeleteCategory/DeleteCategory';
import RenameCategory from './RenameCategory/RenameCategory';
import { connect } from 'react-redux';
import {
  addText,
  addActiv,
  nameCaseRelativity,
  addActivHedgehog,
  itemCategories,
  deleteItemCategories,
  updateItemCategories,
  updateColor,
  updateSalary,
} from './../../Redux/diagrammReducer';
import Color from './Color/Color';
import Relativity from './Relativity/Relativity';
import AddSalaryDate from './AddSalaryDate/AddSalaryDate';

const Setting = (props) => {
  return (
    <Routes>
      <Route path="/" element={<SettingNav />} />

      <Route
        path="/AddCategory"
        element={
          <AddCategory
            diagramm={props.diagramm}
            addText={props.addText}
            addActivHedgehog={props.addActivHedgehog}
            itemCategories={props.itemCategories}
          />
        }
      />
      <Route
        path="/DeleteCategory"
        element={
          <DeleteCategory
            diagramm={props.diagramm}
            addText={props.addText}
            addActiv={props.addActiv}
            addActivHedgehog={props.addActivHedgehog}
            deleteItemCategories={props.deleteItemCategories}
          />
        }
      />
      <Route
        path="/RenameCategory"
        element={
          <RenameCategory
            diagramm={props.diagramm}
            addText={props.addText}
            addActiv={props.addActiv}
            addActivHedgehog={props.addActivHedgehog}
            updateItemCategories={props.updateItemCategories}
          />
        }
      />
      <Route
        path="/Color"
        element={
          <Color
            diagramm={props.diagramm}
            addText={props.addText}
            addActivHedgehog={props.addActivHedgehog}
            updateColor={props.updateColor}
          />
        }
      />
      <Route
        path="/Relativity"
        element={
          <Relativity
            diagramm={props.diagramm}
            addText={props.addText}
            nameCaseRelativity={props.nameCaseRelativity}
            addActivHedgehog={props.addActivHedgehog}
          />
        }
      />
      <Route
        path="/AddSalaryDate"
        element={
          <AddSalaryDate
            addText={props.addText}
            addActivHedgehog={props.addActivHedgehog}
            updateSalary={props.updateSalary}
            diagramm={props.diagramm}
          />
        }
      />
    </Routes>
  );
};
let mapStateToProps = (state) => {
  return {
    diagramm: state.expenses,
  };
};

export default connect(mapStateToProps, {
  addText,
  addActiv,
  nameCaseRelativity,
  addActivHedgehog,
  itemCategories,
  deleteItemCategories,
  updateItemCategories,
  updateColor,
  updateSalary,
})(Setting);
