import { Block, Value } from 'slate'
import { CHILD_REQUIRED, CHILD_TYPE_INVALID, LAST_CHILD_TYPE_INVALID } from 'slate-schema-violations'

const nodeHotkey = (options) => {
  const { type, key } = options
  return {
    onKeyDown(e, change) {
      if (!(e.metaKey || e.ctrlKey) || e.key != key) return

      e.preventDefault()
      const isBlock = change.value.blocks.some((block) => block.type == type)
      change.setBlocks(isBlock ? 'paragraph' : type)
      return true
    },
  }
}

const markHotkey = (options) => {
  const { type, key } = options
  return {
    onKeyDown(e, change) {
      if (!(e.metaKey || e.ctrlKey) || e.key != key) return

      e.preventDefault()
      change.toggleMark(type)
      return true
    },
  }
}

//Slate Schema
export const schema = {
  document: {
    first: { types: ['title'] },
    last: { types: ['paragraph'] },
    nodes: [
      { types: ['title'], min: 1, max: 1 },
      { types: ['paragraph', 'code', 'image', 'yt', 'video', 'quote'], min: 1 },
    ],
    normalize: (change, violation, { node, child, index }) => {
      switch (violation) {
        case CHILD_TYPE_INVALID:
          return change.setNodeByKey(
            child.key,
            index == 0 ? 'title' : 'paragraph'
          )
        case CHILD_REQUIRED:
          const block = Block.create(index == 0 ? 'title' : 'paragraph')
          return change.insertNodeByKey(node.key, index, block)
        case LAST_CHILD_TYPE_INVALID:
          const paragraph = Block.create('paragraph')
          return change.insertNodeByKey(node.key, node.nodes.size, paragraph).focus()
        default:
        break;
      }
    }
  }
}

export { default as CodeNode } from './codeNode.jsx'
export { default as BoldMark } from './boldMark.jsx'
export { default as ItalicMark } from './italicMark.jsx'
export { default as UnderlineMark } from './underlineMark.jsx'
export { default as StrikeMark } from './strikeMark.jsx'
export { default as ImageNode } from './imageNode.jsx'
export { default as YoutubeNode } from './youtubeNode.jsx'
export { default as VideoNode } from './videoNode.jsx'
export { default as QuoteMark } from './QuoteMark.jsx'

//Slate Plugins
export const plugins = [
  markHotkey({ type: 'bold', key: 'b' }),
  markHotkey({ type: 'italic', key: 'i' }),
  markHotkey({ type: 'underline', key: 'u'}),
  markHotkey({ type: 'strike', key: 's' }),
  nodeHotkey({ type: 'quote', key: "'" }),
  nodeHotkey({ type: 'code', key: '`' }),
]