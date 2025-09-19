import { api } from './api-client'

interface RemoveMemberRequest {
  org: string
  memberId: string
}

export async function removeMember({ org, memberId }: RemoveMemberRequest) {
  const result = await api.delete(`organizations/${org}/members/${memberId}`)

  return result
}
