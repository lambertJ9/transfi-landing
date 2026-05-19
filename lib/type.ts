export type KycStatus = 'pending' | 'submitted' | 'approved' | 'rejected'
export type TransactionStatus = 'pending' | 'processing' | 'completed' | 'failed'

export interface Profile {
  id: string
  first_name: string
  last_name: string
  email: string
  phone?: string
  country?: string
  role: 'user' | 'admin'
  kyc_status: KycStatus
  wallet_balance: number
  created_at: string
}

export interface Transaction {
  id: string
  sender_id: string
  sender_name?: string
  sender_country?: string
  sender_currency: string
  recipient_name: string
  recipient_country: string
  recipient_currency: string
  amount_sent: number
  amount_received: number
  exchange_rate: number
  fee: number
  status: TransactionStatus
  reference: string
  notes?: string
  created_at: string
  completed_at?: string
}

export const EXCHANGE_RATES: Record<string, number> = {
  'CAD-NGN': 570,
  'CAD-GHS': 5.2,
  'CAD-KES': 56,
  'CAD-JMD': 58,
  'CAD-TTD': 5.1,
  'CAD-USD': 0.74,
  'CAD-XOF': 450,
  'CAD-ZAR': 10.2,
}

export const COUNTRIES = [
  { code: 'NG', name: 'Nigeria', currency: 'NGN', flag: '🇳🇬' },
  { code: 'GH', name: 'Ghana', currency: 'GHS', flag: '🇬🇭' },
  { code: 'KE', name: 'Kenya', currency: 'KES', flag: '🇰🇪' },
  { code: 'JM', name: 'Jamaica', currency: 'JMD', flag: '🇯🇲' },
  { code: 'TT', name: 'Trinidad & Tobago', currency: 'TTD', flag: '🇹🇹' },
  { code: 'US', name: 'United States', currency: 'USD', flag: '🇺🇸' },
  { code: 'SN', name: 'Senegal', currency: 'XOF', flag: '🇸🇳' },
  { code: 'ZA', name: 'South Africa', currency: 'ZAR', flag: '🇿🇦' },
]

export function getRate(from: string, to: string): number {
  return EXCHANGE_RATES[`${from}-${to}`] || 1
}

export function generateRef(): string {
  return 'TXN-' + Date.now().toString(36).toUpperCase() + '-' +
    Math.random().toString(36).substring(2, 6).toUpperCase()
}
