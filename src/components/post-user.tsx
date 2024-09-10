import { fetchUser } from '@/lib/users-gRPC-client'
import { User } from '@nextui-org/react'

export default async function PostUser({ id }: { id: number }) {
  const user = await fetchUser(id)
  return (
    <>
      <User
        avatarProps={{
          showFallback: true,
          name: `${user.firstName} ${user.lastName}`
        }}
        description={user.email}
        name={`${user.firstName} ${user.lastName}`}
      />
    </>
  )
}
