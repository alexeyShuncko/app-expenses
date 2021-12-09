import React, { useState } from "react";
import s from './HocValuta.module.css';
import FormBynUsd from './../helpers/FormBynUsd/FormBynUsd';


export const HocValuta = (Component, props, activateEditMode, total, styles) => {

    let [editBYN, setEditBYN] = useState("BYN")

    const activEditBYN = (value) => {
         if (value !== editBYN)
            setEditBYN(value)
    }
    return (
        <div className={s.salary}>
            <span className={s.salaryValue}>
                <Component {...props} 
                activateEditMode={activateEditMode} editBYN={editBYN} total={total} styles={styles} /></span>
            <span className={s.salaryValuta}>
                <FormBynUsd addSelect={activEditBYN} editBYN={editBYN} /></span>
        </div>
    )
}