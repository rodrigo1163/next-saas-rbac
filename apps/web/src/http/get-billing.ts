import { api } from './api-client'

interface GetBillingResponse {
  billing: {
    seats: {
      amount: number
      unit: number
      price: number
    }
    projects: {
      amount: number
      unit: number
      price: number
    }
    total: number
  }
}

export async function getBilling(slug: string) {
  const result = await api
    .get(`organizations/${slug}/billing`)
    .json<GetBillingResponse>()

  return result
}
