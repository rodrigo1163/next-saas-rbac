import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { getProfile } from '@/http/get-profile'

export async function isAuthenticated() {
  const cookiesStore = await cookies()

  return !!cookiesStore.get('token-rbac')?.value
}

export async function auth() {
  const cookiesStore = await cookies()

  const token = cookiesStore.get('token-rbac')?.value

  if (!token) {
    redirect('/auth/sign-in')
  }

  try {
    const { user } = await getProfile()

    return { user }
  } catch (error) {}

  redirect('/api/auth/sign-out')
}
