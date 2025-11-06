import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Language, getTranslation } from '@/lib/i18n'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: keyof typeof import('@/lib/i18n').translations['en-US']) => string
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en-US',
  setLanguage: () => {},
  t: () => ''
})

interface LanguageProviderProps {
  children: ReactNode
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>('en-US')

  useEffect(() => {
    const stored = localStorage.getItem('language')
    if (stored === 'zh-CN' || stored === 'en-US') {
      setLanguage(stored)
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem('language', lang)
  }

  const t = (key: keyof typeof import('@/lib/i18n').translations['en-US']) => {
    return getTranslation(language, key)
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}