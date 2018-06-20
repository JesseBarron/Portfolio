import React,{ Component } from 'react'
import './styles/quoteMarkStyles.scss'

const QuoteMark = (props) => {
  return(
    <div {...props.attributes} className="quote-container">
        <span>{props.children}</span>
    </div>
  )
}
export default QuoteMark