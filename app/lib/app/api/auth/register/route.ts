import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const { first_name, last_name, email, password, country, phone } = await req.json()

    if (!first_name || !last_name || !email || !password) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 })
    }

    const supabase = createServerClient()

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { first_name, last_name, country, phone },
      },
    })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({
      message: 'Account created successfully.',
      user: { id: data.user?.id, email: data.user?.email },
    })
  } catch (err) {
    console.error('Register error:', err)
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}
