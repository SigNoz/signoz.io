// @vitest-environment node
import { describe, expect, it } from 'vitest'
import { getLegalDoc, getLegalDocs } from './legal'

describe('legal documents loader', () => {
  it('loads every document in data/legal with its required fields', () => {
    const docs = getLegalDocs()
    expect(docs.length).toBeGreaterThan(0)
    for (const doc of docs) {
      expect(doc.slug).toMatch(/^[a-z0-9-]+$/)
      expect(doc.title).toBeTruthy()
      expect(doc.description).toBeTruthy()
      expect(typeof doc.order).toBe('number')
    }
  })

  it('only resolves slugs of documents inside data/legal', () => {
    expect(getLegalDoc('../../package')).toBeUndefined()
    expect(getLegalDoc('external')).toBeUndefined()
  })
})
