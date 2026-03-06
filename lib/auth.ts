import { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'

export function verifyToken(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    if (!authHeader) return null

    const token = authHeader.split(' ')[1]
    if (!token) return null

    const decoded = jwt.verify(token, process.env.JWT_SECRET!)
    return decoded as { id: string; email: string }
  } catch (error) {
    return null
  }
}
