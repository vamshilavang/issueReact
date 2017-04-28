import React from 'react';

const ErrorMsg = (props) => {
    return (
        <div className="errorMsg">
            <ul style={{listStyle: 'none',marginBottom:'4px'}}>
                <li><span><sup>*</sup></span><strong>{props.Caption} </strong><span>cannot be empty </span></li>
            </ul>
        </div>
    )
}

export default ErrorMsg