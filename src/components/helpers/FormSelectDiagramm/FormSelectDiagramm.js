import React from 'react';
import s from './FormSelectDiagramm.module.css';


const FormSelectDiagramm = (props) => {


    const addSelect = (e) => {
        props.addSelect(e.target.value)
        
    }

    return (
        <select
        className={s.fieldBynUsd}
        defaultValue={props.select}
        onChange={addSelect} 
        >
        <option value="%">%</option>
        <option value="BYN">BYN</option>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
    </select>

    )
}

export default FormSelectDiagramm

