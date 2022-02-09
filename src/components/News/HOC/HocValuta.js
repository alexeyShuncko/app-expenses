import React, { useState } from "react";
import s from './HocValuta.module.css';


export const HocValuta = (Component, props, activateEditMode, totalSumm, filterTable) => {

    let [editBYN, setEditBYN] = useState("BYN")

    const activEditBYN = (e) => {
        if (e.target.value !== editBYN)
            setEditBYN(e.target.value)

    }
    return (
        <div className={s.salary}>
            <div className={s.salaryValue}>
                <Component {...props}
                    activateEditMode={activateEditMode}
                    totalSumm={totalSumm}
                    filterTable={filterTable}
                    editBYN={editBYN}
                />
            </div>
            <div className={s.salaryValuta}>
                <select
                    className={s.fieldBynUsd}
                    name="valuta"
                    defaultValue={editBYN}
                    onChange={activEditBYN} >
                    <option value="BYN">BYN</option>
                    <option value="USD">USD</option>
                </select>
            </div>
        </div>
    )
}