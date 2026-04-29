// Compatibility shim for legacy react-dom APIs
const ReactDOM = require('react-dom')
const ReactDOMClient = require('react-dom/client')

// Re-export all existing exports
module.exports = {
  ...ReactDOM,
  // Add legacy APIs that were moved to react-dom/client
  render: function (element, container, callback) {
    const root = ReactDOMClient.createRoot(container)
    root.render(element)
    if (callback) callback()
    return root
  },
  unmountComponentAtNode: function (container) {
    const root = container._reactRoot
    if (root) {
      root.unmount()
      return true
    }
    return false
  },
}
