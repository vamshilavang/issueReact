import React from 'react';
import DatePicker from 'react-datepicker';

const Calender = (props)=>{
    return <div className="answer">
        <DatePicker
            selected={props.data.Value}
            onChange={props.events}
        /></div>

}

export default Calender