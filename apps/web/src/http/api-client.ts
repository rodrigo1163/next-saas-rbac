import { env } from '@saas/env'
import { getCookie as getCookieClient } from 'cookies-next'
import {
  type CookiesFn,
  getCookie as getCookieServer,
} from 'cookies-next/server'
import ky from 'ky'

export const api = ky.create({
  prefixUrl: env.NEXT_PUBLIC_API_URL,
  hooks: {
    beforeRequest: [
      async (request) => {
        let cookieStore: CookiesFn | undefined
        let token = getCookieClient('token-rbac')

        if (typeof window === 'undefined') {
          const { cookies: serverCookies } = await import('next/headers')

          cookieStore = serverCookies
          token = await getCookieServer('token-rbac', { cookies: cookieStore })
        }

        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`)
        }
      },
    ],
  },
})
