import { api } from './api-client'

interface UpdateMemberRequest {
  org: string
  memberId: string
  role: string
}

export async function updateMember({
  org,
  memberId,
  role,
}: UpdateMemberRequest) {
  const result = await api.put(`organizations/${org}/members/${memberId}`, {
    json: { role },
  })

  return result
}
