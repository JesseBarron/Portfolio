import React,{ Component } from 'react'
import { FaCode, FaFileImageO, FaQuoteLeft, FaFileMovieO } from 'react-icons/lib/fa'
import './styles/editorBttnsStyle.scss'
import { CSSTransition } from 'react-transition-group'


const EditorBttn = ({ openModal, hide, publish }) => {
  return(
    <div>
      <CSSTransition
        in={!hide}
        timeout={300}
        classNames="published"
        unmountOnExit
      >
      <div className={`editorbttns-container ${hide ? 'hide':''}`}>
          <div className='action-bttns'>
            <span title='Add an Image' onClick={(e) => openModal(e, 'image')}>
              <FaFileImageO className='editor-button' />
            </span>
            <span title='Add a Video' onClick={(e) => openModal(e, 'video')}>
              <FaFileMovieO className='editor-button' />
            </span>
            {/* <span title='Add a Quote Block'>
              <FaQuoteLeft className='editor-button' />
            </span>
            <span title='Add Code block'>
              <FaCode className='editor-button' />
            </span> */}
          </div>
            <div className='publish-bttn' onClick={publish}>
              <p>Publish</p>
            </div>
        </div>
      </CSSTransition>
    </div>
  )
}
export default EditorBttn