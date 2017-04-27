import React from 'react';

const TextBox = (props) => {
    return (

            <input type="text" className="form-control" style={{width:'20%'}}
                   name={props.clientProductId+"-"+props.qId} value={props.data.Value}
                   onChange={(event)=>props.events(props.clientProductId,props.clientProductId+"-"+props.qId,props.categoryName,event,props.caption)} />

    )
}

export default TextBox