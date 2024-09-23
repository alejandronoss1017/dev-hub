import UsersTable from '@/components/users-table'
import { fetchUsers } from '@/lib/users-gRPC-client'

export default async function Users() {
  const users = await fetchUsers()

  return (
    <>
      <main>
        <section className="w-full justify-center">
          <UsersTable users={users} />
        </section>
      </main>
    </>
  )
}
