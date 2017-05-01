import React from 'react';

const ErrorMsg = (props) => {
    return (
        <div className="errorMsg">
            <ul style={{listStyle: 'none',marginBottom:'0px'}}>
                <li><span><sup>*</sup></span><strong>{props.Caption} </strong><span>is a required field </span></li>
            </ul>
        </div>
    )
}

export default ErrorMsg
