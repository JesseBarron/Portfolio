import React,{ Component } from 'react'
import { FaCode, FaFileImageO, FaQuoteLeft, FaFileMovieO } from 'react-icons/lib/fa'
import './styles/editorBttnsStyle.scss'
import { CSSTransition } from 'react-transition-group'


const EditorBttn = (props) => {
  return(
    <div>
      <CSSTransition
        in={!props.hide}
        timeout={300}
        classNames="published"
        unmountOnExit
      >
      <div className={`editorbttns-container ${props.hide ? 'hide':''}`}>
          <div className='action-bttns'>
            <span title='Add an Image'>
              <FaFileImageO className='editor-button' />
            </span>
            <span title='Add a Video'>
              <FaFileMovieO className='editor-button' />
            </span>
            <span title='Add a Quote Block'>
              <FaQuoteLeft className='editor-button' />
            </span>
            <span title='Add Code block'>
              <FaCode className='editor-button' />
            </span>
          </div>
            <div className='publish-bttn' onClick={props.publish}>
              <p>Publish</p>
            </div>
        </div>
      </CSSTransition>
    </div>
  )
}
export default EditorBttn