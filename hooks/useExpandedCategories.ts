import { useState, useEffect } from 'react'

export const useExpandedCategories = () => {
  const [expandedCategories, setExpandedCategories] = useState<{ [key: string]: boolean }>(() => {
    const storedState = localStorage.getItem('expandedCategories')
    return storedState ? JSON.parse(storedState) : {}
  })

  useEffect(() => {
    localStorage.setItem('expandedCategories', JSON.stringify(expandedCategories))
  }, [expandedCategories])

  const toggleCategory = (label: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [label]: !prev[label], // Toggle the state for the specified category label
    }))
  }

  const getExpandedCategoriesFromLocalStorage = () => {
    const storedState = localStorage.getItem('expandedCategories')
    if (storedState) {
      setExpandedCategories(JSON.parse(storedState))
    }
  }

  return { expandedCategories, toggleCategory, getExpandedCategoriesFromLocalStorage }
}
