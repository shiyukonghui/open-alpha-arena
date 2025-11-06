import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import AccountDataView from './AccountDataView'
import AssetCurveWithData from './AssetCurveWithData'
import { Button } from '@/components/ui/button'
import { RefreshCw } from 'lucide-react'
import { useLanguageStore } from '@/lib/i18n'

interface Overview {
  account: {
    id: number
    user_id: number
    name: string
    account_type: string
    initial_capital: number
    current_cash: number
    frozen_cash: number
  }
  return_rate: number
  total_notional_value: number
  positions_notional_value: number
  total_assets?: number
  positions_value?: number
  positions_market_value?: number
  portfolio?: {
    total_assets: number
    positions_value: number
  }
}

interface Position {
  id: number
  account_id: number
  symbol: string
  name: string
  market: string
  quantity: number
  available_quantity: number
  avg_cost: number
  leverage: number
  last_price?: number | null
  market_value?: number | null
  notional_value?: number | null
}

interface Order {
  id: number
  order_no: string
  symbol: string
  name: string
  market: string
  side: string
  order_type: string
  price?: number
  quantity: number
  leverage: number
  filled_quantity: number
  status: string
}

interface Trade {
  id: number
  order_id: number
  account_id: number
  symbol: string
  name: string
  market: string
  side: string
  price: number
  quantity: number
  commission: number
  trade_time: string
}

interface AIDecision {
  id: number
  account_id: number
  decision_time: string
  reason: string
  operation: string
  symbol?: string
  prev_portion: number
  target_portion: number
  total_balance: number
  executed: string
  order_id?: number
  leverage?: number
}

interface PortfolioProps {
  overview: Overview
  positions: Position[]
  orders: Order[]
  trades: Trade[]
  aiDecisions: AIDecision[]
  allAssetCurves: any[]
  wsRef: React.MutableRefObject<WebSocket | null>
  onSwitchAccount?: (accountId: number) => void
  onRefreshData?: () => void
  accountRefreshTrigger: number
  accounts: any[]
  loadingAccounts: boolean
}

export default function Portfolio({
  overview,
  positions,
  orders,
  trades,
  aiDecisions,
  allAssetCurves,
  onRefreshData,
  accounts,
  loadingAccounts,
}: PortfolioProps) {
  const [activeTab, setActiveTab] = useState('positions')
  const { t } = useLanguageStore()

  const handleRefresh = () => {
    onRefreshData?.()
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{t('sidebar.portfolio')}</h2>
        <Button variant="outline" size="sm" onClick={handleRefresh}>
          <RefreshCw className="h-4 w-4 mr-2" />
          {t('common.refresh')}
        </Button>
      </div>

      <AccountDataView
        overview={overview}
        positions={positions}
        orders={orders}
        trades={trades}
        aiDecisions={aiDecisions}
        allAssetCurves={allAssetCurves}
        onSwitchAccount={() => {}}
        onRefreshData={handleRefresh}
        accounts={accounts}
        loadingAccounts={loadingAccounts}
      />

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="positions">{t('portfolio.positions')}</TabsTrigger>
          <TabsTrigger value="orders">{t('portfolio.orders')}</TabsTrigger>
          <TabsTrigger value="trades">{t('portfolio.trades')}</TabsTrigger>
          <TabsTrigger value="ai">{t('portfolio.ai_decisions')}</TabsTrigger>
          <TabsTrigger value="curve">{t('portfolio.asset_curve')}</TabsTrigger>
        </TabsList>
        <TabsContent value="positions">
          <Card>
            <CardHeader>
              <CardTitle>{t('portfolio.positions')}</CardTitle>
            </CardHeader>
            <CardContent>
              {positions.length === 0 ? (
                <p className="text-muted-foreground">{t('common.loading')}</p>
              ) : (
                <div className="space-y-2">
                  <div className="grid grid-cols-12 gap-2 text-sm font-medium text-muted-foreground border-b pb-2">
                    <div className="col-span-2">{t('common.symbol')}</div>
                    <div className="col-span-2">{t('common.name')}</div>
                    <div className="col-span-1 text-right">{t('common.quantity')}</div>
                    <div className="col-span-1 text-right">{t('common.available')}</div>
                    <div className="col-span-1 text-right">{t('common.avg_cost')}</div>
                    <div className="col-span-1 text-right">{t('common.price')}</div>
                    <div className="col-span-1 text-right">{t('common.market_value')}</div>
                    <div className="col-span-1 text-right">{t('common.pnl')}</div>
                    <div className="col-span-1 text-right">{t('common.leverage')}</div>
                    <div className="col-span-1 text-right">{t('common.market')}</div>
                  </div>
                  {positions.map((position) => (
                    <div key={position.id} className="grid grid-cols-12 gap-2 text-sm py-2 border-b">
                      <div className="col-span-2 font-medium">{position.symbol}</div>
                      <div className="col-span-2">{position.name}</div>
                      <div className="col-span-1 text-right">{position.quantity.toFixed(4)}</div>
                      <div className="col-span-1 text-right">{position.available_quantity.toFixed(4)}</div>
                      <div className="col-span-1 text-right">{position.avg_cost.toFixed(4)}</div>
                      <div className="col-span-1 text-right">{position.last_price?.toFixed(4) || '-'}</div>
                      <div className="col-span-1 text-right">{position.market_value?.toFixed(2) || '-'}</div>
                      <div className="col-span-1 text-right">
                        {position.market_value && position.avg_cost
                          ? ((position.market_value - position.avg_cost * position.quantity) / (position.avg_cost * position.quantity) * 100).toFixed(2) + '%'
                          : '-'}
                      </div>
                      <div className="col-span-1 text-right">{position.leverage}x</div>
                      <div className="col-span-1 text-right">{position.market}</div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>{t('portfolio.orders')}</CardTitle>
            </CardHeader>
            <CardContent>
              {orders.length === 0 ? (
                <p className="text-muted-foreground">{t('common.loading')}</p>
              ) : (
                <div className="space-y-2">
                  <div className="grid grid-cols-10 gap-2 text-sm font-medium text-muted-foreground border-b pb-2">
                    <div className="col-span-2">{t('common.symbol')}</div>
                    <div className="col-span-1">{t('common.side')}</div>
                    <div className="col-span-1">{t('common.type')}</div>
                    <div className="col-span-1 text-right">{t('common.price')}</div>
                    <div className="col-span-1 text-right">{t('common.quantity')}</div>
                    <div className="col-span-1 text-right">{t('common.filled')}</div>
                    <div className="col-span-1 text-right">{t('common.leverage')}</div>
                    <div className="col-span-1">{t('common.status')}</div>
                    <div className="col-span-1">{t('common.market')}</div>
                  </div>
                  {orders.map((order) => (
                    <div key={order.id} className="grid grid-cols-10 gap-2 text-sm py-2 border-b">
                      <div className="col-span-2 font-medium">{order.symbol}</div>
                      <div className="col-span-1">
                        <span className={`px-2 py-1 rounded text-xs ${
                          order.side === 'BUY' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {order.side}
                        </span>
                      </div>
                      <div className="col-span-1">{order.order_type}</div>
                      <div className="col-span-1 text-right">{order.price?.toFixed(4) || '-'}</div>
                      <div className="col-span-1 text-right">{order.quantity.toFixed(4)}</div>
                      <div className="col-span-1 text-right">{order.filled_quantity.toFixed(4)}</div>
                      <div className="col-span-1 text-right">{order.leverage}x</div>
                      <div className="col-span-1">
                        <span className={`px-2 py-1 rounded text-xs ${
                          order.status === 'FILLED' ? 'bg-green-100 text-green-800' : 
                          order.status === 'PARTIALLY_FILLED' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                      <div className="col-span-1">{order.market}</div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="trades">
          <Card>
            <CardHeader>
              <CardTitle>{t('portfolio.trades')}</CardTitle>
            </CardHeader>
            <CardContent>
              {trades.length === 0 ? (
                <p className="text-muted-foreground">{t('common.loading')}</p>
              ) : (
                <div className="space-y-2">
                  <div className="grid grid-cols-9 gap-2 text-sm font-medium text-muted-foreground border-b pb-2">
                    <div className="col-span-2">{t('common.symbol')}</div>
                    <div className="col-span-1">{t('common.side')}</div>
                    <div className="col-span-1 text-right">{t('common.price')}</div>
                    <div className="col-span-1 text-right">{t('common.quantity')}</div>
                    <div className="col-span-1 text-right">{t('common.commission')}</div>
                    <div className="col-span-1 text-right">{t('common.value')}</div>
                    <div className="col-span-1">{t('common.time')}</div>
                    <div className="col-span-1">{t('common.market')}</div>
                  </div>
                  {trades.map((trade) => (
                    <div key={trade.id} className="grid grid-cols-9 gap-2 text-sm py-2 border-b">
                      <div className="col-span-2 font-medium">{trade.symbol}</div>
                      <div className="col-span-1">
                        <span className={`px-2 py-1 rounded text-xs ${
                          trade.side === 'BUY' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {trade.side}
                        </span>
                      </div>
                      <div className="col-span-1 text-right">{trade.price.toFixed(4)}</div>
                      <div className="col-span-1 text-right">{trade.quantity.toFixed(4)}</div>
                      <div className="col-span-1 text-right">{trade.commission.toFixed(4)}</div>
                      <div className="col-span-1 text-right">{(trade.price * trade.quantity).toFixed(2)}</div>
                      <div className="col-span-1 text-xs">{new Date(trade.trade_time).toLocaleTimeString()}</div>
                      <div className="col-span-1">{trade.market}</div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="ai">
          <Card>
            <CardHeader>
              <CardTitle>{t('portfolio.ai_decisions')}</CardTitle>
            </CardHeader>
            <CardContent>
              {aiDecisions.length === 0 ? (
                <p className="text-muted-foreground">{t('common.loading')}</p>
              ) : (
                <div className="space-y-2">
                  <div className="grid grid-cols-8 gap-2 text-sm font-medium text-muted-foreground border-b pb-2">
                    <div className="col-span-1">{t('common.symbol')}</div>
                    <div className="col-span-2">{t('common.time')}</div>
                    <div className="col-span-1">{t('portfolio.operation')}</div>
                    <div className="col-span-1">{t('portfolio.portion')}</div>
                    <div className="col-span-1">{t('common.leverage')}</div>
                    <div className="col-span-1">{t('common.status')}</div>
                    <div className="col-span-1">{t('common.reason')}</div>
                  </div>
                  {aiDecisions.map((decision) => (
                    <div key={decision.id} className="grid grid-cols-8 gap-2 text-sm py-2 border-b">
                      <div className="col-span-1 font-medium">{decision.symbol || '-'}</div>
                      <div className="col-span-2 text-xs">{new Date(decision.decision_time).toLocaleString()}</div>
                      <div className="col-span-1">
                        <span className={`px-2 py-1 rounded text-xs ${
                          decision.operation === 'open' ? 'bg-green-100 text-green-800' : 
                          decision.operation === 'close' ? 'bg-red-100 text-red-800' : 
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {decision.operation}
                        </span>
                      </div>
                      <div className="col-span-1 text-xs">
                        {decision.target_portion > 0 ? `${(decision.target_portion * 100).toFixed(1)}%` : '-'}
                      </div>
                      <div className="col-span-1">
                        {decision.leverage && decision.leverage > 1 ? `${decision.leverage}x` : '-'}
                      </div>
                      <div className="col-span-1">
                        <span className={`px-2 py-1 rounded text-xs ${
                          decision.executed === 'true' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {decision.executed === 'true' ? t('common.executed') : t('common.pending')}
                        </span>
                      </div>
                      <div className="col-span-1 text-xs truncate" title={decision.reason}>
                        {decision.reason}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="curve">
          <Card>
            <CardHeader>
              <CardTitle>{t('portfolio.asset_curve')}</CardTitle>
            </CardHeader>
            <CardContent>
              <AssetCurveWithData 
                data={allAssetCurves}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}