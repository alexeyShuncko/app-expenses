//import React from "react";
//import s from './StatisticTable.module.css';


export const MonthFunc = (data) => {

  return (

   data.slice(5, 7) + '.' + data.slice(0, 4)
 
  ) 

}