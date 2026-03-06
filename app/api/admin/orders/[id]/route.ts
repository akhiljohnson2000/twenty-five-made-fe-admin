import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '@/lib/auth'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const auth = verifyToken(request)
    if (!auth) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { id } = params

    const { data: order, error } = await supabase
      .from('orders')
      .update(body)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(order)
  } catch (error: any) {
    console.error('Update order error:', error)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}
