import React, { Component } from 'react'


const ItalicMark = (props) => {
  return (
    <em {...props.attributes}>{props.children}</em>
  )
}
export default ItalicMark