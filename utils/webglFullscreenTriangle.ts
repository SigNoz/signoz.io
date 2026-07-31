type FullscreenTriangleContext = WebGLRenderingContext | WebGL2RenderingContext

const fullscreenTriangleVertices = new Float32Array([-1, -1, 3, -1, -1, 3])

function createShader(gl: FullscreenTriangleContext, type: number, source: string): WebGLShader {
  const shader = gl.createShader(type)
  if (!shader) throw new Error('Unable to create WebGL shader')

  gl.shaderSource(shader, source)
  gl.compileShader(shader)

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const info = gl.getShaderInfoLog(shader)
    gl.deleteShader(shader)
    throw new Error(`Unable to compile WebGL shader: ${info}`)
  }

  return shader
}

export function createProgram(
  gl: FullscreenTriangleContext,
  vertexSource: string,
  fragmentSource: string
): WebGLProgram {
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexSource)
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentSource)
  const program = gl.createProgram()

  if (!program) {
    gl.deleteShader(vertexShader)
    gl.deleteShader(fragmentShader)
    throw new Error('Unable to create WebGL program')
  }

  gl.attachShader(program, vertexShader)
  gl.attachShader(program, fragmentShader)
  gl.linkProgram(program)
  gl.deleteShader(vertexShader)
  gl.deleteShader(fragmentShader)

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const info = gl.getProgramInfoLog(program)
    gl.deleteProgram(program)
    throw new Error(`Unable to link WebGL program: ${info}`)
  }

  return program
}

export function createFullscreenTriangle(gl: FullscreenTriangleContext, program: WebGLProgram) {
  const buffer = gl.createBuffer()
  const positionLocation = gl.getAttribLocation(program, 'position')

  if (!buffer || positionLocation < 0) {
    if (buffer) gl.deleteBuffer(buffer)
    throw new Error('Unable to create WebGL fullscreen triangle')
  }

  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(gl.ARRAY_BUFFER, fullscreenTriangleVertices, gl.STATIC_DRAW)
  gl.enableVertexAttribArray(positionLocation)
  gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0)

  return () => {
    gl.deleteBuffer(buffer)
  }
}

export function resizeCanvas(
  gl: FullscreenTriangleContext,
  width: number,
  height: number,
  dpr: number
) {
  const canvas = gl.canvas as HTMLCanvasElement
  const pixelWidth = Math.max(1, Math.floor(width * dpr))
  const pixelHeight = Math.max(1, Math.floor(height * dpr))

  if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
    canvas.width = pixelWidth
    canvas.height = pixelHeight
  }

  gl.viewport(0, 0, pixelWidth, pixelHeight)
}

export function loseContext(gl: FullscreenTriangleContext) {
  gl.getExtension('WEBGL_lose_context')?.loseContext()
}
