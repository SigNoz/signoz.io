'use client'
import { useState, useEffect } from 'react'

export const useExpandedCategories = () => {
  const [expandedCategories, setExpandedCategories] = useState({})

  useEffect(() => {
    const storedState = localStorage.getItem('expandedCategories')

    if (storedState) {
      setExpandedCategories(JSON.parse(storedState))
    }
  }, [])

  const toggleCategory = (label: string) => {
    // Update local storage first
    const updatedCategories = {
      ...expandedCategories,
      [label]: !expandedCategories[label], // Toggle the state for the specified category label
    }
    localStorage.setItem('expandedCategories', JSON.stringify(updatedCategories))

    // Update state
    setExpandedCategories(updatedCategories)
  }

  const getExpandedCategoriesFromLocalStorage = () => {
    const storedState = localStorage.getItem('expandedCategories')
    if (storedState) {
      setExpandedCategories(JSON.parse(storedState))
    }
  }

  return { expandedCategories, toggleCategory, getExpandedCategoriesFromLocalStorage }
}
