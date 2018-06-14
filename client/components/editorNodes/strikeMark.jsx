import React from 'react'


const StrikeMark = (props) => {
  return (
    <del {...props.attributes}>{props.children}</del>
  )
}
export default StrikeMark