import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const supabase = createServerClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser(
      req.headers.get('authorization')?.replace('Bearer ', '') || ''
    )

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })
    }

    const body = await req.json()
    const { full_name, date_of_birth, nationality, id_type, id_number, address, city, postal_code, country } = body

    if (!full_name || !date_of_birth || !nationality || !id_type || !id_number || !address || !city || !country) {
      return NextResponse.json({ error: 'All KYC fields are required.' }, { status: 400 })
    }

    const { data: existing } = await supabase
      .from('kyc_submissions')
      .select('id, status')
      .eq('user_id', user.id)
      .single()

    if (existing) {
      return NextResponse.json({ error: 'KYC already submitted.', status: existing.status }, { status: 409 })
    }

    const { data: kyc, error: kycError } = await supabase
      .from('kyc_submissions')
      .insert({
        user_id: user.id,
        full_name, date_of_birth, nationality,
        id_type, id_number, address, city,
        postal_code, country, status: 'pending'
      })
      .select()
      .single()

    if (kycError) throw kycError

    await supabase
      .from('profiles')
      .update({ kyc_status: 'submitted' })
      .eq('id', user.id)

    return NextResponse.json({ message: 'KYC submitted successfully.', kyc })
  } catch (err) {
    console.error('KYC error:', err)
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    const supabase = createServerClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser(
      req.headers.get('authorization')?.replace('Bearer ', '') || ''
    )

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })
    }

    const { data: kyc } = await supabase
      .from('kyc_submissions')
      .select('*')
      .eq('user_id', user.id)
      .single()

    return NextResponse.json({ kyc })
  } catch (err) {
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}
