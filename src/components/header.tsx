'use client'

import {
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem
} from '@nextui-org/react'
import { FolderCode } from 'lucide-react'
import React from 'react'
import { ThemeSwitcher } from './theme-switcher'
import { usePathname } from 'next/navigation'

export default function Header() {
  const pathName = usePathname()

  return (
    <Navbar isBordered>
      <NavbarBrand>
        <FolderCode size={24} />
        <p className="font-bold text-inherit ml-4">Dev hub</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive={pathName.startsWith('/posts')}>
          <Link href="/posts">Posts</Link>
        </NavbarItem>
        <NavbarItem isActive={pathName.startsWith('/users')}>
          <Link href="/users" aria-current="page">
            Users
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}
