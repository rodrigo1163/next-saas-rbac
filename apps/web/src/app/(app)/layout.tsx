import { redirect } from 'next/navigation'

import { isAuthenticated } from '@/auth/auth'

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const isAuth = await isAuthenticated()

  if (!isAuth) {
    redirect('/auth/sign-in')
  }

  return <>{children}</>
}
