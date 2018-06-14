import React from 'react'


const CodeNode = (props) => {
  return (
    <div {...props.attributes} style={{backgroundColor: 'grey'}}>
      <code>{props.children}</code>
    </div>
  )
}
export default CodeNode