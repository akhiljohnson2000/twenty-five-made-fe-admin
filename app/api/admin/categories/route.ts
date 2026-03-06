import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '@/lib/auth'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(request: NextRequest) {
  try {
    const auth = verifyToken(request)
    if (!auth) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const { data: categories, error } = await supabase
      .from('categories')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json(categories)
  } catch (error: any) {
    console.error('Get categories error:', error)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const auth = verifyToken(request)
    if (!auth) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { name, description } = body

    const { data: category, error } = await supabase
      .from('categories')
      .insert([{ name, description }])
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(category, { status: 201 })
  } catch (error: any) {
    console.error('Add category error:', error)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}
