'use client'

import { Button, ButtonProps } from '@nextui-org/react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export interface ThemeSwitcherProps
  extends Omit<ButtonProps, 'onPress' | 'isIconOnly' | 'children'> {}

export function ThemeSwitcher(props: ThemeSwitcherProps) {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <>
      <Button
        {...props}
        isIconOnly
        onPress={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      >
        {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
      </Button>
    </>
  )
}
