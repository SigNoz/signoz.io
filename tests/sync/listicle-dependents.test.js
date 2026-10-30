const { describe, it } = require('node:test')
const assert = require('node:assert/strict')
const fs = require('fs')
const os = require('os')
const path = require('path')

const { withDependentListicles } = require('../../scripts/cms-sync/listicle-dependents')

describe('withDependentListicles', () => {
  it('adds listicles that include a changed listicle', () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'listicles-'))
    const write = (name, config) =>
      fs.writeFileSync(path.join(dir, `${name}.json`), JSON.stringify(config))
    write('source', { pattern: 'flat', items: [] })
    write('catalog', { pattern: 'sectioned', sections: [{ id: 'a', include: ['source#x@/docs'] }] })
    write('object-form', {
      pattern: 'sectioned',
      sections: [{ id: 'a', include: [{ from: 'source' }] }],
    })
    write('unrelated', { pattern: 'flat', items: [] })

    const result = withDependentListicles(['constants/listicles/source.json'], dir)

    assert.deepEqual(result.sort(), [
      'constants/listicles/catalog.json',
      'constants/listicles/object-form.json',
      'constants/listicles/source.json',
    ])
  })

  it('returns the input when nothing includes the changed listicle', () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'listicles-'))
    fs.writeFileSync(path.join(dir, 'source.json'), JSON.stringify({ pattern: 'flat', items: [] }))

    assert.deepEqual(withDependentListicles(['constants/listicles/source.json'], dir), [
      'constants/listicles/source.json',
    ])
  })
})
