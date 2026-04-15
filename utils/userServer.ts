import 'server-only'
import crypto from 'crypto'

export const generateUserHash = (userId: string, secret: string): string => {
  return crypto.createHmac('sha256', secret).update(userId).digest('hex')
}
