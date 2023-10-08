import React from "react";

export default function Card({ serial, heading, method }) {
    return (<div className="card">
        <div className="id">
            <span className='num'>{serial}</span>
        </div>
        <div className="card-content">
            <h4 className='card-heading'>{heading}</h4>
            <p className='method'>{method}</p>
        </div>
    </div>)
}