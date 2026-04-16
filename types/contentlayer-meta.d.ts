// Type declarations for lightweight metadata JSON imports
// These allow TypeScript to understand the dynamic imports of generated meta files

declare module '*/_index-meta.json' {
  const value: unknown[]
  export default value
}
