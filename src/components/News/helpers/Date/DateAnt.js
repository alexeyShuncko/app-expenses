import React from "react";
import { DatePicker } from "antd";
import moment from 'moment';



const DateAnt = (props) => {

    
    const { RangePicker } = DatePicker;

   const onOpenChange =(open)=> {
       if (!open) {
      
       }
     
   }
  
    const disabledDate = current => {
        let customDate = props.po;
        return current && current > moment(customDate, "YYYY-MM-DD")
    }
  
  
    return (
                <RangePicker 
               
                onOpenChange={onOpenChange}
                placement='bottomLeft'
                defaultValue={[(props.period.S && moment(props.period.S))|| moment(props.s),
                    (props.period.Po && moment(props.period.Po)) || moment(props.po)]}
                disabledDate={disabledDate}
                onChange={props.onChangeDate}/>
                        
    )
}


export default DateAnt