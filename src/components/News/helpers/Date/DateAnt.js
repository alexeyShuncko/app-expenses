import React from "react";
import { DatePicker } from "antd";
import moment from 'moment';



const DateAnt = (props) => {

    
    const { RangePicker } = DatePicker;

   
    const disabledDate = current => {
        let customDate = props.po;
        return current && current > moment(customDate, "YYYY-MM-DD")
    }
  
  
    return (
                <RangePicker 
                placement='bottomLeft'
                defaultValue={[moment(props.s),moment(props.po)]}
                disabledDate={disabledDate}
                onChange={props.onChangeDate}/>
                        
    )
}


export default DateAnt