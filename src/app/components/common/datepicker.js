import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

const Calender = (props)=>{
    return <div className="answer" style={{ display: 'inline-block'}}>
        <DatePicker className={"form-control" + (!props.data.isValid?' errorMsg':'')}
            selected={props.data.Value}
            onChange={props.events}
            maxDate={moment().add(0,"days")}
            placeholderText="Click to select date"
        /></div>

}

export default Calender
