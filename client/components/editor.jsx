import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Editor } from 'slate-react'
import { Value } from 'slate'
import isURL from 'is-url'

import './styles/editorStyles.scss'
import { EditorBttns, HoverMenu, Modal, InputURL } from './index'
import {
  plugins,
  schema,
  CodeNode,
  BoldMark,
  ItalicMark,
  UnderlineMark,
  StrikeMark,
  ImageNode,
  VideoNode,
  YoutubeNode,
  QuoteMark
} from './editorNodes'

const existingValue = JSON.parse(localStorage.getItem('blog'))
const initialValue = Value.fromJSON(
  existingValue || {
  document: {
    nodes: [
      {
        object: 'block',
        type: 'title',
      },
    ],
  }
})

class EditorComp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: initialValue,
      published: false,
      showModal: false,
      mediaType: '',
      error: '',
    }
  }
  componentDidMount() {
    this.updateMenu()
  }
  componentDidUpdate() {
    this.updateMenu()
  }
  menuRef = (menu) => {
    this.menu = menu
  }
  handleChange = ({value}) => {
    const content = JSON.stringify(value.toJSON())
    localStorage.setItem('blog', content)
    this.setState({ value });
  }
  toggleModal = (e, mediaType) => {
    e.preventDefault()

    this.setState({
      showModal: !!mediaType,
      mediaType: mediaType || '',
      error: ''
    })
  }
  insertMedia = (e, type) => {
    e.preventDefault()
    if(!type || !isURL(e.target['media-url'].value)) {
      this.setState({ error: `Please enter a valid ${type} url` })
      return
    }

    const src = e.target['media-url'].value
    type == 'image' ? this.addImage(src) : this.addVideo(src)

    this.setState({ showModal: false })
    return
  }
  addImage = (src) => {
    const { value } = this.state
    const change = value.change().insertBlock({
      type: 'image',
      isVoid: true,
      data: {
        src
      }
    })
    this.handleChange(change)
  }
  addVideo = (src) => {
    const { value } = this.state
    const isYoutube = /^.*youtube\.com.*$/ig.test(src)
    src = isYoutube ? src.replace(/^(.*\/)(watch\?v=)(.*)/i, 'https://www.youtube.com/embed/$3') : src

    const change = value.change().insertBlock({
      type: isYoutube ? 'yt' : 'video', 
      isVoid: true,
      data: {
        src,
      },
    })
    this.handleChange(change)
  }
  publish = () => {
    const { value } = this.state
    const title = value.toJSON().document.nodes[0].nodes[0].leaves[0].text
    const body = JSON.stringify(value.toJSON())
    const newSong = {
      title,
      author: this.props.authorId,
      body,
    }
    this.setState({ published: true })
  }
  updateMenu = () => {
    const { value } = this.state
    const menu = this.menu
    if(!menu) return

    if(value.isBlurred || value.isEmpty) {
      menu.removeAttribute('style')
      return 
    }
    const selection = window.getSelection()
    const range = selection.getRangeAt(0)
    const rect = range.getBoundingClientRect()
    menu.style.opacity = 1
    menu.style['pointer-events'] = 'auto'
    menu.style.top = `${rect.top + window.pageYOffset - menu.offsetHeight}px`
    menu.style.left = `${rect.left + window.pageXOffset - menu.offsetWidth / 2 + rect.width / 2}px`
  }
  render() {
    const { mediaType, showModal, value, published, error } = this.state
    return (
      <div className={`editor ${this.state.published ? 'publish' : ''}`}>
        <Modal show={showModal} options={{ buttons: false, backgrndClose: false }}>
          <InputURL 
            insert={this.insertMedia}
            closeModal={this.toggleModal}
            type={mediaType}
            error={error}
          />
        </Modal>
        <HoverMenu 
          menuRef={this.menuRef}
          onChange={this.handleChange}
          value={this.state.value}
        />
        <Editor
          readOnly={this.state.published}
          plugins={plugins}
          schema={schema}
          value={this.state.value}
          onChange={this.handleChange}
          renderNode={this.renderNode}
          renderMark={this.renderMark}
          renderPlaceholder={this.renderPlaceholder}
        />
        <EditorBttns 
          publish={this.publish}
          hide={published}
          openModal={this.toggleModal}
        />
      </div>
    )
  }
  renderPlaceholder = (props) => {
    const { node, editor } = props
    const patt = /^title/gi
    if(node.object != 'block') return
    if(!patt.test(node.type)) return
    if(node.text != '') return

    return (
      <span
        contentEditable={false}
        style={{ display: 'inline-block', width: '0', whiteSpace: 'nowrap', opacity: '0.33' }}
      >
        Title . . .
      </span>
    )
  }
  renderNode = (props) => {
    switch(props.node.type) {
      case 'paragraph':
        return (
          <div {...props.attributes} >
            <p>
              {props.children}
            </p>
          </div>
        )
      case 'title':
        return <h2 {...props.attributes} className={`title`}>{props.children}</h2>
      case 'code':
        return <CodeNode {...props} />
      case 'quote':
        return <QuoteMark {...props} />
      case 'image':
        return <ImageNode {...props} />
      case 'yt':
        return <YoutubeNode {...props} />
      case 'video':
        return <VideoNode {...props} />
    }
  }
  renderMark = (props) => {
    switch(props.mark.type) {
      case 'bold':
        return <BoldMark {...props} />
      case 'italic':
        return <ItalicMark {...props} />
      case 'underline':
        return <UnderlineMark {...props} />
      case 'strike':
        return <StrikeMark {...props} />
    }
  }
}

const mapState = ({ User }) => ({
  authorId: User.id
})

const mapDispatch = (dispatch) => ({
  postBlog(blog) {
    //postBlog
  }
})

export default connect(mapState, mapDispatch)(EditorComp)