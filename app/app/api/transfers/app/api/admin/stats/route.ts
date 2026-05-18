import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const adminClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(req: NextRequest) {
  try {
    const adminKey = req.headers.get('x-admin-key')
    if (adminKey !== process.env.ADMIN_SECRET_KEY) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })
    }

    const { count: totalUsers } = await adminClient
      .from('profiles')
      .select('*', { count: 'exact', head: true })

    const { data: kycData } = await adminClient
      .from('profiles')
      .select('kyc_status')

    const kycStats = {
      pending: kycData?.filter(u => u.kyc_status === 'pending').length || 0,
      submitted: kycData?.filter(u => u.kyc_status === 'submitted').length || 0,
      approved: kycData?.filter(u => u.kyc_status === 'approved').length || 0,
      rejected: kycData?.filter(u => u.kyc_status === 'rejected').length || 0,
    }

    const { data: txData } = await adminClient
      .from('transactions')
      .select('amount_sent, status, recipient_country, created_at')

    const totalTransactions = txData?.length || 0
    const totalVolume = txData?.reduce((sum, t) => sum + (t.amount_sent || 0), 0) || 0
    const completedTx = txData?.filter(t => t.status === 'completed').length || 0

    const countryCounts: Record<string, number> = {}
    txData?.forEach(t => {
      countryCounts[t.recipient_country] = (countryCounts[t.recipient_country] || 0) + 1
    })

    const { data: recentUsers } = await adminClient
      .from('profiles')
      .select('id, first_name, last_name, email, country, kyc_status, wallet_balance, created_at')
      .order('created_at', { ascending: false })
      .limit(20)

    const { data: recentTx } = await adminClient
      .from('transactions')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(20)

    const { count: waitlistCount } = await adminClient
      .from('waitlist')
      .select('*', { count: 'exact', head: true })

    return NextResponse.json({
      stats: {
        totalUsers,
        totalTransactions,
        totalVolume: totalVolume.toFixed(2),
        completedTransactions: completedTx,
        waitlistCount,
        kycStats,
        countryCounts,
      },
      recentUsers,
      recentTransactions: recentTx,
    })
  } catch (err) {
    console.error('Admin stats error:', err)
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}
