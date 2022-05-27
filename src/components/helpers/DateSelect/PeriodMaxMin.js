//import React from 'react';
import { DateFunc } from '../DateFunc/DateFunc';



 // чтобы запретить выбор одного числа с и по

const PeriodMaxMin = (period,today,choice) => {

    let date = new Date(period || today)

     return  choice === 'S'
     ? DateFunc(new Date(date.setDate(date.getDate() - 1)))
     : DateFunc(new Date(date.setDate(date.getDate() + 1)))        
}

export default PeriodMaxMin

