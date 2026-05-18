import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'
import { getRate, generateRef } from '@/lib/types'

const FEE_PERCENT = 0.015

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
    const { recipient_name, recipient_country, recipient_currency, amount_sent, notes } = body

    if (!recipient_name || !recipient_country || !recipient_currency || !amount_sent) {
      return NextResponse.json({ error: 'All transfer fields are required.' }, { status: 400 })
    }

    if (amount_sent < 10) {
      return NextResponse.json({ error: 'Minimum transfer amount is $10 CAD.' }, { status: 400 })
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    if (!profile) {
      return NextResponse.json({ error: 'Profile not found.' }, { status: 404 })
    }

    if (profile.kyc_status !== 'approved') {
      return NextResponse.json({
        error: 'KYC verification required before sending money.',
        kyc_status: profile.kyc_status
      }, { status: 403 })
    }

    const fee = parseFloat((amount_sent * FEE_PERCENT).toFixed(2))
    const amount_after_fee = amount_sent - fee
    const rate = getRate('CAD', recipient_currency)
    const amount_received = parseFloat((amount_after_fee * rate).toFixed(2))

    if (profile.wallet_balance < amount_sent) {
      return NextResponse.json({ error: 'Insufficient wallet balance.' }, { status: 400 })
    }

    await supabase
      .from('profiles')
      .update({ wallet_balance: profile.wallet_balance - amount_sent })
      .eq('id', user.id)

    const { data: tx, error: txError } = await supabase
      .from('transactions')
      .insert({
        sender_id: user.id,
        sender_name: `${profile.first_name} ${profile.last_name}`,
        sender_country: profile.country || 'Canada',
        sender_currency: 'CAD',
        recipient_name,
        recipient_country,
        recipient_currency,
        amount_sent,
        amount_received,
        exchange_rate: rate,
        fee,
        status: 'processing',
        reference: generateRef(),
        notes,
      })
      .select()
      .single()

    if (txError) throw txError

    return NextResponse.json({
      message: 'Transfer initiated successfully.',
      transaction: tx,
    })
  } catch (err) {
    console.error('Transfer error:', err)
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

    const { data: transactions, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('sender_id', user.id)
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json({ transactions })
  } catch (err) {
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}
