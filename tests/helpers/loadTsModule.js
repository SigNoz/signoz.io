const fs = require('node:fs')
const path = require('node:path')
const ts = require('typescript')

const resolveModulePath = (modulePath) => {
  if (path.extname(modulePath)) return modulePath

  const extensionCandidates = ['.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs']
  for (const extension of extensionCandidates) {
    const candidate = `${modulePath}${extension}`
    if (fs.existsSync(candidate)) return candidate
  }

  const indexCandidates = extensionCandidates.map((extension) =>
    path.join(modulePath, `index${extension}`)
  )
  for (const candidate of indexCandidates) {
    if (fs.existsSync(candidate)) return candidate
  }

  return modulePath
}

const loadTsModule = (relativePath) => {
  const repoRoot = path.resolve(__dirname, '..', '..')
  const sourcePath = path.resolve(__dirname, '..', '..', relativePath)
  const source = fs.readFileSync(sourcePath, 'utf8')
  const transpiled = ts.transpileModule(source, {
    compilerOptions: {
      esModuleInterop: true,
      allowSyntheticDefaultImports: true,
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
    },
  })
  const transpiledWithAliases = transpiled.outputText.replace(
    /require\((['"])@\/([^'"]+)\1\)/g,
    (_match, _quote, subPath) =>
      `require(${JSON.stringify(resolveModulePath(path.join(repoRoot, subPath)))})`
  )
  const tmpFile = path.join(
    repoRoot,
    `.codex-test-${path.basename(relativePath)}-${process.pid}-${Date.now()}.cjs`
  )
  fs.writeFileSync(tmpFile, transpiledWithAliases, 'utf8')
  try {
    return require(tmpFile)
  } finally {
    fs.rmSync(tmpFile, { force: true })
  }
}

module.exports = { loadTsModule }
