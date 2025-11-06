import { Button } from '@/components/ui/button'
import { useLanguage } from '@/contexts/LanguageContext'
import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'

interface User {
  id: number
  username: string
}

interface Account {
  id: number
  user_id: number
  name: string
  account_type: string
  initial_capital: number
  current_cash: number
  frozen_cash: number
}

interface HeaderProps {
  title?: string
  currentUser?: User | null
  currentAccount?: Account | null
  showAccountSelector?: boolean
  onUserChange?: (username: string) => void
}

export default function Header({ title = 'Crypto Paper Trading', currentUser, currentAccount, showAccountSelector = false, onUserChange }: HeaderProps) {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof document === 'undefined') return 'dark'
    return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
  })
  const { language, setLanguage, t } = useLanguage()

  useEffect(() => {
    if (typeof window === 'undefined') return
    const stored = window.localStorage.getItem('theme')
    if (stored === 'light' || stored === 'dark') {
      setTheme(stored)
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark')
    }
  }, [])

  useEffect(() => {
    if (typeof document === 'undefined') return
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('theme', theme)
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))
  }

  const toggleLanguage = () => {
    setLanguage(language === 'en-US' ? 'zh-CN' : 'en-US')
  }

  return (
    <header className="w-full border-b bg-background/50 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="w-full py-2 px-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">{t('title')}</h1>
        
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleLanguage}
            aria-label={t('toggleLanguage')}
            className="text-sm font-medium"
            title={language === 'en-US' ? '切换到中文' : 'Switch to English'}
          >
            {language === 'en-US' ? '中' : 'EN'}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label={t('toggleTheme')}
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </div>
      </div>
    </header>
  )
}
