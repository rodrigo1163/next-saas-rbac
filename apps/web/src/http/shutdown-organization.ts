import { api } from './api-client'

interface ShutdownOrganizationRequest {
  org: string
}

export async function shutdownOrganization({
  org,
}: ShutdownOrganizationRequest) {
  const result = await api.delete(`organizations/${org}`)

  return result
}
