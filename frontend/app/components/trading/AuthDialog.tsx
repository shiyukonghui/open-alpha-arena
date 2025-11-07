import React from 'react'
import { Button } from '@/components/ui/button'
import { toast } from 'react-hot-toast'
import { useLanguage } from '@/contexts/LanguageContext'

interface User {
  current_cash: number
  frozen_cash: number
  has_password: boolean
  id?: string
}

interface AuthDialogProps {
  isOpen: boolean
  pendingTrade: { side: 'BUY' | 'SELL' } | null
  user?: User
  onClose: () => void
  onAuthenticate: (sessionToken: string, orderData: any) => void
  orderData: {
    symbol: string
    market: string
    side: 'BUY' | 'SELL'
    order_type: 'MARKET' | 'LIMIT'
    price?: number
    quantity: number
  }
}

export default function AuthDialog({
  isOpen,
  pendingTrade,
  user,
  onClose,
  onAuthenticate,
  orderData
}: AuthDialogProps) {
  const { t } = useLanguage()

  const handleConfirmTrade = () => {
    if (!pendingTrade) return
    
    // For paper trading, just confirm the trade without authentication
    toast.success('Trade confirmed - Paper Trading Mode')
    
    // Use a dummy session token for paper trading
    const dummySessionToken = 'paper-trading-session'
    const finalOrderData = {
      ...orderData,
      session_token: dummySessionToken
    }

    onAuthenticate(dummySessionToken, finalOrderData)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-background rounded-lg p-6 w-80 max-w-sm mx-4">
        <h3 className="text-lg font-semibold mb-4">
          {t('confirm')} - {pendingTrade?.side === 'BUY' ? t('buy') : t('sell')}
        </h3>
        
        <div className="space-y-4">
          <div className="text-xs text-muted-foreground">
            <p><strong>{t('symbol')}:</strong> {orderData.symbol}</p>
            <p><strong>{t('type')}:</strong> {orderData.order_type === 'LIMIT' ? t('limitOrder') : t('marketOrder')}</p>
            <p><strong>{t('quantity')}:</strong> {orderData.quantity}</p>
            {orderData.price && <p><strong>{t('price')}:</strong> ${orderData.price}</p>}
          </div>


          <div className="flex gap-3 pt-2">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              {t('cancel')}
            </Button>
            <Button
              onClick={handleConfirmTrade}
              className="flex-1"
            >
              {t('confirm')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
