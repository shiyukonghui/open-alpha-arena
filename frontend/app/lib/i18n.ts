// 国际化配置文件
import { create } from 'zustand'

// 定义语言类型
export type Language = 'en' | 'zh'

// 定义翻译键值对类型
interface Translations {
  [key: string]: {
    en: string
    zh: string
  }
}

// 定义翻译内容
const translations: Translations = {
  // Header translations
  'header.title': {
    en: 'Crypto Paper Trading',
    zh: '加密货币模拟交易'
  },
  'header.toggle_theme': {
    en: 'Toggle theme',
    zh: '切换主题'
  },
  
  // Sidebar translations
  'sidebar.open_alpha_arena': {
    en: 'Open Alpha Arena',
    zh: '开放阿尔法竞技场'
  },
  'sidebar.portfolio': {
    en: 'Portfolio',
    zh: '投资组合'
  },
  'sidebar.asset_curve': {
    en: 'Asset Curve',
    zh: '资产曲线'
  },
  'sidebar.settings': {
    en: 'Settings',
    zh: '设置'
  },
  
  // Settings Dialog translations
  'settings.title': {
    en: 'Account Management',
    zh: '账户管理'
  },
  'settings.description': {
    en: 'Manage your trading accounts and AI configurations',
    zh: '管理您的交易账户和AI配置'
  },
  'settings.accounts': {
    en: 'Trading Accounts',
    zh: '交易账户'
  },
  'settings.add_account': {
    en: 'Add Account',
    zh: '添加账户'
  },
  'settings.account_name': {
    en: 'Account name',
    zh: '账户名称'
  },
  'settings.model': {
    en: 'Model',
    zh: '模型'
  },
  'settings.base_url': {
    en: 'Base URL',
    zh: '基础URL'
  },
  'settings.api_key': {
    en: 'API Key',
    zh: 'API密钥'
  },
  'settings.test_and_save': {
    en: 'Test and Save',
    zh: '测试并保存'
  },
  'settings.test_and_create': {
    en: 'Test and Create',
    zh: '测试并创建'
  },
  'settings.cancel': {
    en: 'Cancel',
    zh: '取消'
  },
  'settings.add_new_account': {
    en: 'Add New Account',
    zh: '添加新账户'
  },
  'settings.no_model_configured': {
    en: 'No model configured',
    zh: '未配置模型'
  },
  'settings.cash': {
    en: 'Cash',
    zh: '现金'
  },
  
  // Portfolio translations
  'portfolio.positions': {
    en: 'Positions',
    zh: '持仓'
  },
  'portfolio.orders': {
    en: 'Orders',
    zh: '订单'
  },
  'portfolio.trades': {
    en: 'Trades',
    zh: '交易'
  },
  'portfolio.ai_decisions': {
    en: 'AI Decisions',
    zh: 'AI决策'
  },
  'portfolio.asset_curve': {
    en: 'Asset Curve',
    zh: '资产曲线'
  },
  
  // Common translations
  'common.loading': {
    en: 'Loading...',
    zh: '加载中...'
  },
  'common.error': {
    en: 'Error',
    zh: '错误'
  },
  'common.success': {
    en: 'Success',
    zh: '成功'
  },
  'common.save': {
    en: 'Save',
    zh: '保存'
  },
  'common.edit': {
    en: 'Edit',
    zh: '编辑'
  },
  'common.delete': {
    en: 'Delete',
    zh: '删除'
  },
  'common.refresh': {
    en: 'Refresh',
    zh: '刷新'
  },
  'common.name': {
    en: 'Name',
    zh: '名称'
  },
  'common.type': {
    en: 'Type',
    zh: '类型'
  },
  'common.capital': {
    en: 'Capital',
    zh: '资金'
  },
  'common.cash': {
    en: 'Cash',
    zh: '现金'
  },
  'common.value': {
    en: 'Value',
    zh: '价值'
  },
  'common.quantity': {
    en: 'Quantity',
    zh: '数量'
  },
  'common.price': {
    en: 'Price',
    zh: '价格'
  },
  'common.time': {
    en: 'Time',
    zh: '时间'
  },
  'common.status': {
    en: 'Status',
    zh: '状态'
  },
  'common.side': {
    en: 'Side',
    zh: '方向'
  },
  'common.symbol': {
    en: 'Symbol',
    zh: '符号'
  },
  'common.market': {
    en: 'Market',
    zh: '市场'
  },
  'common.leverage': {
    en: 'Leverage',
    zh: '杠杆'
  },
  'common.commission': {
    en: 'Commission',
    zh: '手续费'
  },
  'common.avg_cost': {
    en: 'Avg Cost',
    zh: '平均成本'
  },
  'common.market_value': {
    en: 'Market Value',
    zh: '市场价值'
  },
  'common.pnl': {
    en: 'P&L',
    zh: '盈亏'
  },
  'common.return_rate': {
    en: 'Return Rate',
    zh: '收益率'
  },
  'common.total_assets': {
    en: 'Total Assets',
    zh: '总资产'
  },
  'common.available': {
    en: 'Available',
    zh: '可用'
  },
  
  // Order form translations
  'order_form.title': {
    en: 'Place Order',
    zh: '下单'
  },
  'order_form.buy': {
    en: 'Buy',
    zh: '买入'
  },
  'order_form.sell': {
    en: 'Sell',
    zh: '卖出'
  },
  'order_form.market_order': {
    en: 'Market Order',
    zh: '市价单'
  },
  'order_form.limit_order': {
    en: 'Limit Order',
    zh: '限价单'
  },
  'order_form.place_order': {
    en: 'Place Order',
    zh: '下单'
  },
  
  // Trade buttons translations
  'trade_buttons.buy': {
    en: 'Buy',
    zh: '买入'
  },
  'trade_buttons.sell': {
    en: 'Sell',
    zh: '卖出'
  },
  'trade_buttons.long': {
    en: 'Long',
    zh: '做多'
  },
  'trade_buttons.short': {
    en: 'Short',
    zh: '做空'
  },
  
  // Account selector translations
  'account_selector.switch_account': {
    en: 'Switch Account',
    zh: '切换账户'
  },
  'account_selector.create_account': {
    en: 'Create Account',
    zh: '创建账户'
  },
  
  // Auth dialog translations
  'auth.title': {
    en: 'Authentication',
    zh: '身份验证'
  },
  'auth.username': {
    en: 'Username',
    zh: '用户名'
  },
  'auth.password': {
    en: 'Password',
    zh: '密码'
  },
  'auth.login': {
    en: 'Login',
    zh: '登录'
  },
  'auth.logout': {
    en: 'Logout',
    zh: '登出'
  },
  'auth.switch_user': {
    en: 'Switch User',
    zh: '切换用户'
  },
  
  // Comprehensive view translations
  'comprehensive.title': {
    en: 'Open Alpha Arena',
    zh: '开放阿尔法竞技场'
  },
  
  // Messages
  'messages.connecting': {
    en: 'Connecting to trading server...',
    zh: '正在连接到交易服务器...'
  },
  'messages.ws_connected': {
    en: 'WebSocket connected',
    zh: 'WebSocket已连接'
  },
  'messages.ws_closed': {
    en: 'WebSocket closed',
    zh: 'WebSocket已关闭'
  },
  'messages.ws_error': {
    en: 'WebSocket error',
    zh: 'WebSocket错误'
  },
  'messages.order_placed': {
    en: 'Order placed, waiting for fill',
    zh: '订单已提交，等待成交'
  },
  'messages.order_filled': {
    en: 'Order filled',
    zh: '订单已成交'
  },
  'messages.switched_user': {
    en: 'Switched to',
    zh: '已切换到'
  },
  'messages.switched_account': {
    en: 'Switched to',
    zh: '已切换到'
  },
  'messages.order_error': {
    en: 'Order error',
    zh: '订单错误'
  },
  'messages.not_connected': {
    en: 'Not connected to server',
    zh: '未连接到服务器'
  },
  'messages.failed_send_order': {
    en: 'Failed to send order',
    zh: '发送订单失败'
  },
  'messages.failed_switch_user': {
    en: 'Failed to switch user',
    zh: '切换用户失败'
  },
  'messages.failed_switch_account': {
    en: 'Failed to switch account',
    zh: '切换账户失败'
  },
  'messages.account_created': {
    en: 'Account created successfully!',
    zh: '账户创建成功！'
  },
  'messages.account_updated': {
    en: 'Account updated successfully!',
    zh: '账户更新成功！'
  },
  'messages.failed_create_account': {
    en: 'Failed to create account',
    zh: '创建账户失败'
  },
  'messages.failed_update_account': {
    en: 'Failed to update account',
    zh: '更新账户失败'
  },
  'messages.failed_load_accounts': {
    en: 'Failed to load accounts',
    zh: '加载账户失败'
  },
  'messages.testing_llm': {
    en: 'Testing LLM connection...',
    zh: '正在测试LLM连接...'
  },
  'messages.test_passed': {
    en: 'LLM connection test passed!',
    zh: 'LLM连接测试通过！'
  },
  'messages.test_failed': {
    en: 'LLM Test Failed',
    zh: 'LLM测试失败'
  },
  'messages.account_required': {
    en: 'Account name is required',
    zh: '账户名称为必填项'
  },
  'messages.saving_account': {
    en: 'Saving account...',
    zh: '正在保存账户...'
  },
  'messages.creating_account': {
    en: 'Creating account...',
    zh: '正在创建账户...'
  },
  'messages.loading_accounts': {
    en: 'Loading accounts...',
    zh: '正在加载账户...'
  },
}

// 定义语言状态类型
interface LanguageState {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

// 创建语言状态存储
export const useLanguageStore = create<LanguageState>((set, get) => ({
  language: 'en',
  setLanguage: (language: Language) => set({ language }),
  t: (key: string) => {
    const { language } = get()
    const translation = translations[key]
    if (!translation) {
      console.warn(`Missing translation for key: ${key}`)
      return key
    }
    return translation[language] || translation.en || key
  }
}))

export default translations