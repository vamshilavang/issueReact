import React from 'react';

const Checkbox = (props) => {
    return (
        <label className="choices radio-inline">
            <input type="checbox" className="radio" 
            name={props.clientProductId+"-"+props.qId} checked={props.selected} 
            onChange={()=>props.events(props.clientProductId,props.clientProductId+"-"+props.qId,props.categoryName,props.data)} />
            <span className={(props.selected == false?' errorMsgText':'')}>{props.data.Desc}</span>
        </label>
    )
}

export default Checkbox