// components/MarkdownRenderer.js
import React from 'react'
import ReactMarkdown from 'react-markdown'

const MarkdownRenderer = ({ markdownContent }) => {
  return <ReactMarkdown>{markdownContent}</ReactMarkdown>
}

export default MarkdownRenderer
