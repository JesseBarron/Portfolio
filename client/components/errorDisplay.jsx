import React, { Component } from 'react'


const ErrorDisplay = ({ error }) => {

    return (
        <React.Fragment>
            {
                error &&
                <h4>{ error }</h4>
            }
        </React.Fragment>
    )
}
export default ErrorDisplay