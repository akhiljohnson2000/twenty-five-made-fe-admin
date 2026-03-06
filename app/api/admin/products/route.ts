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

    const { data: products, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json(products)
  } catch (error: any) {
    console.error('Get products error:', error)
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
    const { name, description, price, stock, category_id, image_url } = body

    const { data: product, error } = await supabase
      .from('products')
      .insert([
        {
          name,
          description,
          price,
          stock,
          category_id,
          image_url,
        },
      ])
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(product, { status: 201 })
  } catch (error: any) {
    console.error('Add product error:', error)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}
