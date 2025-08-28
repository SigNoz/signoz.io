import { useEffect } from 'react'

interface UseSearchShortcutProps {
  onOpen: () => void
  isEnabled?: boolean
}

const useSearchShortcut = ({ onOpen, isEnabled = true }: UseSearchShortcutProps) => {
  useEffect(() => {
    if (!isEnabled) return

    const handleKeyDown = (event: KeyboardEvent) => {
      // Check for / key (slash) to open search
      if (event.key === '/' && !event.metaKey && !event.ctrlKey && !event.altKey) {
        // Don't trigger if user is typing in an input, textarea, or contenteditable
        const target = event.target as HTMLElement
        const isTyping = target.tagName === 'INPUT' || 
                        target.tagName === 'TEXTAREA' || 
                        target.contentEditable === 'true'
        
        if (!isTyping) {
          event.preventDefault()
          onOpen()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [onOpen, isEnabled])
}

export default useSearchShortcut
