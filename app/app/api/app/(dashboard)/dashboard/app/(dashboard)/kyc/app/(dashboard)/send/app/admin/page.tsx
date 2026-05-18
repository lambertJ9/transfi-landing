import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const adminClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function PATCH(req: NextRequest) {
  try {
    const adminKey = req.headers.get('x-admin-key')
    if (adminKey !== process.env.ADMIN_SECRET_KEY) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })
    }

    const { user_id, action, notes } = await req.json()
    if (!user_id || !action) {
      return NextResponse.json({ error: 'user_id and action required.' }, { status: 400 })
    }

    const status = action === 'approve' ? 'approved' : 'rejected'

    await adminClient
      .from('kyc_submissions')
      .update({ status, admin_notes: notes, reviewed_at: new Date().toISOString() })
      .eq('user_id', user_id)

    await adminClient
      .from('profiles')
      .update({ kyc_status: status })
      .eq('id', user_id)

    if (status === 'approved') {
      await adminClient
        .from('profiles')
        .update({ wallet_balance: 500.00 })
        .eq('id', user_id)
    }

    return NextResponse.json({ message: `KYC ${status} successfully.` })
  } catch (err) {
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}
