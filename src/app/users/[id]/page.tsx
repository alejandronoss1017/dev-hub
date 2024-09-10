import { SubmitButton } from '@/components/submit-button'
import { fetchUser, updateUser } from '@/lib/users-gRPC-client'
import { Button, Input, User as NextUIUser } from '@nextui-org/react'

export default async function User({ params }: { params: { id: number } }) {
  const user = await fetchUser(params.id)

  return (
    <>
      <NextUIUser
        avatarProps={{
          showFallback: true,
          name: `${user.firstName} ${user.lastName}`
        }}
        description={user.email}
        name={`${user.firstName} ${user.lastName}`}
      />

      <form className="h-full flex flex-col gap-4 w-1/2">
        <Input
          isReadOnly
          defaultValue={user.id.toString()}
          value={user.id.toString()}
          name="id"
          label="Id"
          type="number"
          variant="bordered"
        />
        <Input
          defaultValue={user.firstName}
          name="firstName"
          isRequired
          label="First name"
          description="Enter your first name"
          type="text"
          variant="bordered"
        />
        <Input
          defaultValue={user.lastName}
          name="lastName"
          isRequired
          label="Last name"
          description="Enter your last name"
          type="text"
          variant="bordered"
        />
        <Input
          defaultValue={user.email}
          name="email"
          isRequired
          label="Email"
          description="Enter your email"
          type="email"
          variant="bordered"
        />
        <span className="flex gap-4 justify-end">
          <Button variant="flat" color="danger">
            Cancel
          </Button>
          <SubmitButton formAction={updateUser} variant="flat" color="primary">
            Submit
          </SubmitButton>
        </span>
      </form>
    </>
  )
}
