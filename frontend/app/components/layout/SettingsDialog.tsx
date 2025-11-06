import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, Pencil } from 'lucide-react'
import { 
  getAccounts as getAccounts,
  createAccount as createAccount,
  updateAccount as updateAccount,
  testLLMConnection,
  type TradingAccount,
  type TradingAccountCreate,
  type TradingAccountUpdate
} from '@/lib/api'
import { useLanguageStore } from '@/lib/i18n'

interface SettingsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAccountUpdated?: () => void  // Add callback for when account is updated
}

interface AIAccount extends TradingAccount {
  model?: string
  base_url?: string
  api_key?: string
}

interface AIAccountCreate extends TradingAccountCreate {
  model?: string
  base_url?: string
  api_key?: string
}

export default function SettingsDialog({ open, onOpenChange, onAccountUpdated }: SettingsDialogProps) {
  const [accounts, setAccounts] = useState<AIAccount[]>([])
  const [loading, setLoading] = useState(false)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [testResult, setTestResult] = useState<string | null>(null)
  const [testing, setTesting] = useState(false)
  const [newAccount, setNewAccount] = useState<AIAccountCreate>({
    name: '',
    model: '',
    base_url: '',
    api_key: 'default-key-please-update-in-settings',
  })
  const [editAccount, setEditAccount] = useState<AIAccountCreate>({
    name: '',
    model: '',
    base_url: '',
    api_key: 'default-key-please-update-in-settings',
  })
  
  const { t } = useLanguageStore()

  const loadAccounts = async () => {
    try {
      setLoading(true)
      const data = await getAccounts()
      setAccounts(data)
    } catch (error) {
      console.error('Failed to load accounts:', error)
      toast.error(t('messages.failed_load_accounts'))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (open) {
      loadAccounts()
      setError(null)
      setTestResult(null)
      setShowAddForm(false)
      setEditingId(null)
    }
  }, [open])

  const handleCreateAccount = async () => {
    try {
      setLoading(true)
      setTesting(true)
      setError(null)
      setTestResult(null)

      if (!newAccount.name || !newAccount.name.trim()) {
        setError(t('messages.account_required'))
        setLoading(false)
        setTesting(false)
        return
      }

      // If AI fields are provided, test LLM connection first
      if (newAccount.model || newAccount.base_url || newAccount.api_key) {
        setTestResult(t('messages.testing_llm'))
        try {
          const testResponse = await testLLMConnection({
            model: newAccount.model,
            base_url: newAccount.base_url,
            api_key: newAccount.api_key,
          })
          if (!testResponse.success) {
            const message = testResponse.message || t('messages.test_failed')
            setError(`${t('messages.test_failed')}: ${message}`)
            setTestResult(`❌ ${t('messages.test_failed')}: ${message}`)
            setLoading(false)
            setTesting(false)
            return
          }
          setTestResult(`✅ ${t('messages.test_passed')} ${t('messages.creating_account')}...`)
        } catch (testError) {
          const message = testError instanceof Error ? testError.message : t('messages.test_failed')
          setError(`${t('messages.test_failed')}: ${message}`)
          setTestResult(`❌ ${t('messages.test_failed')}: ${message}`)
          setLoading(false)
          setTesting(false)
          return
        }
      }

      console.log('Creating account with data:', newAccount)
      await createAccount(newAccount)
      setNewAccount({ name: '', model: '', base_url: '', api_key: 'default-key-please-update-in-settings' })
      setShowAddForm(false)
      await loadAccounts()

      toast.success(t('messages.account_created'))

      // Notify parent component that account was created
      onAccountUpdated?.()
    } catch (error) {
      console.error('Failed to create account:', error)
      const errorMessage = error instanceof Error ? error.message : t('messages.failed_create_account')
      setError(errorMessage)
      toast.error(`${t('messages.failed_create_account')}: ${errorMessage}`)
    } finally {
      setLoading(false)
      setTesting(false)
      setTestResult(null)
    }
  }

  const handleUpdateAccount = async () => {
    if (!editingId) return
    try {
      setLoading(true)
      setTesting(true)
      setError(null)
      setTestResult(null)
      
      if (!editAccount.name || !editAccount.name.trim()) {
        setError(t('messages.account_required'))
        setLoading(false)
        setTesting(false)
        return
      }
      
      // Test LLM connection first if AI model data is provided
      if (editAccount.model || editAccount.base_url || editAccount.api_key) {
        setTestResult(t('messages.testing_llm'))
        
        try {
          const testResponse = await testLLMConnection({
            model: editAccount.model,
            base_url: editAccount.base_url,
            api_key: editAccount.api_key
          })
          
          if (!testResponse.success) {
            setError(`${t('messages.test_failed')}: ${testResponse.message}`)
            setTestResult(`❌ ${t('messages.test_failed')}: ${testResponse.message}`)
            setLoading(false)
            setTesting(false)
            return
          }
          
          setTestResult(`✅ ${t('messages.test_passed')}`)
        } catch (testError) {
          const errorMessage = testError instanceof Error ? testError.message : t('messages.test_failed')
          setError(`${t('messages.test_failed')}: ${errorMessage}`)
          setTestResult(`❌ ${t('messages.test_failed')}: ${errorMessage}`)
          setLoading(false)
          setTesting(false)
          return
        }
      }
      
      setTesting(false)
      setTestResult(`✅ ${t('messages.test_passed')} ${t('messages.saving_account')}...`)
      
      console.log('Updating account with data:', editAccount)
      await updateAccount(editingId, editAccount)
      setEditingId(null)
      setEditAccount({ name: '', model: '', base_url: '', api_key: '' })
      setTestResult(null)
      await loadAccounts()
      
      toast.success(t('messages.account_updated'))
      
      // Notify parent component that account was updated
      onAccountUpdated?.()
    } catch (error) {
      console.error('Failed to update account:', error)
      const errorMessage = error instanceof Error ? error.message : t('messages.failed_update_account')
      setError(errorMessage)
      setTestResult(null)
      toast.error(`${t('messages.failed_update_account')}: ${errorMessage}`)
    } finally {
      setLoading(false)
      setTesting(false)
    }
  }

  const startEdit = (account: AIAccount) => {
    setEditingId(account.id)
    setEditAccount({
      name: account.name,
      model: account.model || '',
      base_url: account.base_url || '',
      api_key: account.api_key || '',
    })
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditAccount({ name: '', model: '', base_url: '', api_key: 'default-key-please-update-in-settings' })
    setTestResult(null)
    setError(null)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{t('settings.title')}</DialogTitle>
          <DialogDescription>
            {t('settings.description')}
          </DialogDescription>
        </DialogHeader>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <div className="space-y-6">
          {/* Existing Accounts */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">{t('settings.accounts')}</h3>
              <Button
                onClick={() => setShowAddForm(!showAddForm)}
                size="sm"
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                {t('settings.add_account')}
              </Button>
            </div>

            {loading && accounts.length === 0 ? (
              <div>{t('messages.loading_accounts')}</div>
            ) : (
              <div className="space-y-3">
                {accounts.map((account) => (
                  <div key={account.id} className="border rounded-lg p-4">
                    {editingId === account.id ? (
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                          <Input
                            placeholder={t('settings.account_name')}
                            value={editAccount.name || ''}
                            onChange={(e) => setEditAccount({ ...editAccount, name: e.target.value })}
                          />
                          <Input
                            placeholder={t('settings.model')}
                            value={editAccount.model || ''}
                            onChange={(e) => setEditAccount({ ...editAccount, model: e.target.value })}
                          />
                        </div>
                        <Input
                          placeholder={t('settings.base_url')}
                          value={editAccount.base_url || ''}
                          onChange={(e) => setEditAccount({ ...editAccount, base_url: e.target.value })}
                        />
                        <Input
                          placeholder={t('settings.api_key')}
                          type="password"
                          value={editAccount.api_key || ''}
                          onChange={(e) => setEditAccount({ ...editAccount, api_key: e.target.value })}
                        />
                        {testResult && (
                          <div className={`text-xs p-2 rounded ${
                            testResult.includes('❌') 
                              ? 'bg-red-50 text-red-700 border border-red-200' 
                              : 'bg-green-50 text-green-700 border border-green-200'
                          }`}>
                            {testResult}
                          </div>
                        )}
                        <div className="flex gap-2">
                          <Button onClick={handleUpdateAccount} disabled={loading || testing} size="sm">
                            {testing ? t('common.loading') : t('settings.test_and_save')}
                          </Button>
                          <Button onClick={cancelEdit} variant="outline" size="sm" disabled={loading || testing}>
                            {t('settings.cancel')}
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <div className="space-y-1 flex-1">
                          <div className="font-medium">{account.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {account.model ? `${t('settings.model')}: ${account.model}` : t('settings.no_model_configured')}
                          </div>
                          {account.base_url && (
                            <div className="text-xs text-muted-foreground truncate">
                              {t('settings.base_url')}: {account.base_url}
                            </div>
                          )}
                          {account.api_key && (
                            <div className="text-xs text-muted-foreground">
                              {t('settings.api_key')}: {'*'.repeat(Math.max(0, (account.api_key?.length || 0) - 4))}{account.api_key?.slice(-4) || '****'}
                            </div>
                          )}
                          <div className="text-xs text-muted-foreground">
                            {t('settings.cash')}: ${account.current_cash?.toLocaleString() || '0'}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            onClick={() => startEdit(account)}
                            variant="outline"
                            size="sm"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Add New Account Form */}
          {showAddForm && (
            <div className="space-y-4 border-t pt-4">
              <h3 className="text-lg font-medium">{t('settings.add_new_account')}</h3>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    placeholder={t('settings.account_name')}
                    value={newAccount.name || ''}
                    onChange={(e) => setNewAccount({ ...newAccount, name: e.target.value })}
                  />
                  <Input
                    placeholder={t('settings.model')}
                    value={newAccount.model || ''}
                    onChange={(e) => setNewAccount({ ...newAccount, model: e.target.value })}
                  />
                </div>
                <Input
                  placeholder={t('settings.base_url')}
                  value={newAccount.base_url || ''}
                  onChange={(e) => setNewAccount({ ...newAccount, base_url: e.target.value })}
                />
                <Input
                  placeholder={t('settings.api_key')}
                  type="password"
                  value={newAccount.api_key || ''}
                  onChange={(e) => setNewAccount({ ...newAccount, api_key: e.target.value })}
                />
                <div className="flex gap-2">
                  <Button onClick={handleCreateAccount} disabled={loading}>
                    {t('settings.test_and_create')}
                  </Button>
                  <Button 
                    onClick={() => setShowAddForm(false)} 
                    variant="outline"
                  >
                    {t('settings.cancel')}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}