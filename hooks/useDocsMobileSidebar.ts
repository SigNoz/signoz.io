'use client'

import { useSyncExternalStore } from 'react'

let _isOpen = false
const _listeners = new Set<() => void>()

function notify() {
  _listeners.forEach((l) => l())
}

export function openDocsMobileSidebar() {
  _isOpen = true
  notify()
}

export function closeDocsMobileSidebar() {
  _isOpen = false
  notify()
}

export function toggleDocsMobileSidebar() {
  _isOpen = !_isOpen
  notify()
}

function subscribe(cb: () => void) {
  _listeners.add(cb)
  return () => {
    _listeners.delete(cb)
  }
}

function getSnapshot() {
  return _isOpen
}

function getServerSnapshot() {
  return false
}

export function useDocsMobileSidebarOpen() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
