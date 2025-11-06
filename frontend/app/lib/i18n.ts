export type Language = 'zh-CN' | 'en-US'

export const translations = {
  'zh-CN': {
    title: '阿尔法加密货币交易',
    toggleTheme: '切换主题',
    toggleLanguage: '切换语言',
    light: '浅色',
    dark: '深色',
    chinese: '中文',
    english: '英文',
    
    // Sidebar
    portfolio: '投资组合',
    comprehensive: '综合视图',
    settings: '设置',
    
    // Portfolio/Account
    account: '账户',
    overview: '概览',
    positions: '持仓',
    orders: '订单',
    trades: '交易',
    aiDecisions: 'AI决策',
    returnRate: '收益率',
    totalAssets: '总资产',
    positionsValue: '持仓价值',
    availableCash: '可用资金',
    frozenCash: '冻结资金',
    initialCapital: '初始资金',
    currentValue: '当前价值',
    pnl: '盈亏',
    pnlPercentage: '盈亏比例',
    todayPnL: '今日盈亏',
    todayReturn: '今日收益',
    noPositions: '暂无持仓',
    noOrders: '暂无订单',
    noTrades: '暂无交易',
    
    // Crypto
    crypto: '加密货币',
    buy: '买入',
    sell: '卖出',
    symbol: '代码',
    name: '名称',
    price: '价格',
    quantity: '数量',
    leverage: '杠杆',
    market: '市场',
    side: '方向',
    type: '类型',
    status: '状态',
    filled: '已成交',
    pending: '待成交',
    cancelled: '已取消',
    time: '时间',
    commission: '手续费',
    
    // Trading
    placeOrder: '下单',
    marketOrder: '市价单',
    limitOrder: '限价单',
    cancelOrder: '取消订单',
    confirmCancel: '确认取消此订单?',
    orderPlaced: '订单已提交',
    orderCancelled: '订单已取消',
    insufficientFunds: '资金不足',
    
    // Common
    loading: '加载中...',
    error: '错误',
    success: '成功',
    confirm: '确认',
    cancel: '取消',
    save: '保存',
    refresh: '刷新',
    search: '搜索',
    clear: '清除',
    
    // Trading specific
    invalidPrice: '请输入有效的价格',
    invalidQuantity: '请输入有效的数量',
    insufficientCash: '资金不足，需要',
    insufficientPosition: '持仓不足'
  },
  'en-US': {
    title: 'Crypto Paper Trading',
    toggleTheme: 'Toggle theme',
    toggleLanguage: 'Toggle language',
    light: 'Light',
    dark: 'Dark',
    chinese: 'Chinese',
    english: 'English',
    
    // Sidebar
    portfolio: 'Portfolio',
    comprehensive: 'Comprehensive',
    settings: 'Settings',
    
    // Portfolio/Account
    account: 'Account',
    overview: 'Overview',
    positions: 'Positions',
    orders: 'Orders',
    trades: 'Trades',
    aiDecisions: 'AI Decisions',
    returnRate: 'Return Rate',
    totalAssets: 'Total Assets',
    positionsValue: 'Positions Value',
    availableCash: 'Available Cash',
    frozenCash: 'Frozen Cash',
    initialCapital: 'Initial Capital',
    currentValue: 'Current Value',
    pnl: 'P&L',
    pnlPercentage: 'P&L %',
    todayPnL: "Today's P&L",
    todayReturn: "Today's Return",
    noPositions: 'No positions',
    noOrders: 'No orders',
    noTrades: 'No trades',
    
    // Crypto
    crypto: 'Cryptocurrency',
    buy: 'Buy',
    sell: 'Sell',
    symbol: 'Symbol',
    name: 'Name',
    price: 'Price',
    quantity: 'Quantity',
    leverage: 'Leverage',
    market: 'Market',
    side: 'Side',
    type: 'Type',
    status: 'Status',
    filled: 'Filled',
    pending: 'Pending',
    cancelled: 'Cancelled',
    time: 'Time',
    commission: 'Commission',
    
    // Trading
    placeOrder: 'Place Order',
    marketOrder: 'Market Order',
    limitOrder: 'Limit Order',
    cancelOrder: 'Cancel Order',
    confirmCancel: 'Confirm cancellation of this order?',
    orderPlaced: 'Order placed',
    orderCancelled: 'Order cancelled',
    insufficientFunds: 'Insufficient funds',
    
    // Common
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    confirm: 'Confirm',
    cancel: 'Cancel',
    save: 'Save',
    refresh: 'Refresh',
    search: 'Search',
    clear: 'Clear',
    
    // Trading specific
    invalidPrice: 'Please input a valid price',
    invalidQuantity: 'Please input a valid quantity',
    insufficientCash: 'Insufficient cash. Need',
    insufficientPosition: 'Insufficient position to close'
  }
}

export function getTranslation(lang: Language, key: keyof typeof translations['en-US']) {
  return translations[lang]?.[key] || translations['en-US'][key]
}