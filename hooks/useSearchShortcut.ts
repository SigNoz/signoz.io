import { useEffect } from 'react'

interface UseSearchShortcutProps {
  onOpen: () => void
  isEnabled?: boolean
}

const useSearchShortcut = ({ onOpen, isEnabled = true }: UseSearchShortcutProps) => {
  useEffect(() => {
    if (!isEnabled) return

    const handleKeyDown = (event: KeyboardEvent) => {
      // Check for Cmd+K (Mac) or Ctrl+K (Windows/Linux)
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault()
        onOpen()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [onOpen, isEnabled])
}

export default useSearchShortcut
