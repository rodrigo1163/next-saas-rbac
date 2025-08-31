import { defineAbilityFor } from '@saas/auth'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { getMembership } from '@/http/get-membership'
import { getProfile } from '@/http/get-profile'

export async function isAuthenticated() {
  const cookiesStore = await cookies()

  return !!cookiesStore.get('token-rbac')?.value
}

export async function getCurrentOrg() {
  const cookiesStore = await cookies()
  const currentOrg = cookiesStore.get('org')?.value ?? null

  return currentOrg
}

export async function getCurrentMemberShip() {
  const org = await getCurrentOrg()

  if (!org) {
    return null
  }

  const { membership } = await getMembership(org)

  return membership
}

export async function ability() {
  const membership = await getCurrentMemberShip()

  if (!membership) {
    return null
  }

  const ability = defineAbilityFor({
    id: membership.userId,
    role: membership.role,
  })

  return ability
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
