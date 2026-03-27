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

const transpileSource = (sourcePath, source) => {
  const repoRoot = path.resolve(__dirname, '..', '..')
  const sourceDir = path.dirname(sourcePath)
  const transpiled = ts.transpileModule(source, {
    compilerOptions: {
      esModuleInterop: true,
      allowSyntheticDefaultImports: true,
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
    },
  })

  return transpiled.outputText
    .replace(
      /require\((['"])@\/([^'"]+)\1\)/g,
      (_match, _quote, subPath) =>
        `require(${JSON.stringify(resolveModulePath(path.join(repoRoot, subPath)))})`
    )
    .replace(
      /require\((['"])(\.\.?\/[^'"]+)\1\)/g,
      (_match, _quote, relPath) =>
        `require(${JSON.stringify(resolveModulePath(path.resolve(sourceDir, relPath)))})`
    )
}

const loadTsModule = (relativePath) => {
  const repoRoot = path.resolve(__dirname, '..', '..')
  const sourcePath = path.resolve(__dirname, '..', '..', relativePath)
  const source = fs.readFileSync(sourcePath, 'utf8')
  const transpiledWithAliases = transpileSource(sourcePath, source)
  // Keep the temp file in the repo root so transpiled relative imports resolve like source imports.
  const tmpFile = path.join(
    repoRoot,
    `.test-transpile-${path.basename(relativePath)}-${process.pid}-${Date.now()}.cjs`
  )
  fs.writeFileSync(tmpFile, transpiledWithAliases, 'utf8')
  const previousHooks = {
    '.ts': require.extensions['.ts'],
    '.tsx': require.extensions['.tsx'],
  }

  const registerHook = (extension) => {
    require.extensions[extension] = (module, filename) => {
      const moduleSource = fs.readFileSync(filename, 'utf8')
      const compiled = transpileSource(filename, moduleSource)
      module._compile(compiled, filename)
    }
  }

  registerHook('.ts')
  registerHook('.tsx')

  try {
    return require(tmpFile)
  } finally {
    if (previousHooks['.ts']) {
      require.extensions['.ts'] = previousHooks['.ts']
    } else {
      delete require.extensions['.ts']
    }

    if (previousHooks['.tsx']) {
      require.extensions['.tsx'] = previousHooks['.tsx']
    } else {
      delete require.extensions['.tsx']
    }

    fs.rmSync(tmpFile, { force: true })
  }
}

module.exports = { loadTsModule }
