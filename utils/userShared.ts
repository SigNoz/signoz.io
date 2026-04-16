export const extractGroupIdFromEmail = (email?: string): string | undefined => {
  if (!email) return undefined
  const parts = email.split('@')
  return parts.length === 2 ? parts[1] : undefined
}
