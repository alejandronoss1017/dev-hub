import { ThemeSwitcher } from '@/components/theme-switcher'

export default function Home() {
  return (
    <main className="flex min-h-full flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold">Hello World!</h1>

      <div className="flex gap-4 justify-center">
        <ThemeSwitcher variant="flat" />
      </div>
    </main>
  )
}
