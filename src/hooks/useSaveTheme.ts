import { useEffect } from 'react'
import { useLocalStorage } from 'react-use'
import { useDarkMode } from './useDarkMode'

export const Theme = {
  Dark: 'dark',
  Light: 'light',
} as const

type ReturnType = () => {
  isDarkMode: boolean
  handleDarkMode: (isDark: boolean) => void
}

export const useSaveTheme: ReturnType = () => {
  const [value, setValue] = useLocalStorage<typeof Theme['Dark' | 'Light']>('theme')
  const { isDarkMode, handleDarkMode } = useDarkMode((value === undefined) ? true : !!(value === Theme.Dark))

  const persistToggle = (isDark: boolean) => {
    handleDarkMode(isDark)
    setValue(isDark ? Theme.Dark : Theme.Light)
  }

  useEffect(() => {
    if (
      value === Theme.Light ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      handleDarkMode(false)
      setValue(Theme.Light)
    } else {
      handleDarkMode(true)
      setValue(Theme.Dark)
    }
  }, [value, setValue, handleDarkMode])

  return { isDarkMode, handleDarkMode: persistToggle }
}
