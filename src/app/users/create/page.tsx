import { SubmitButton } from '@/components/submit-button'
import { createUser } from '@/lib/users-gRPC-client'
import { Button, Input } from '@nextui-org/react'
import React from 'react'

export default function CreateUser() {
  return (
    <>
      <main className="flex flex-col w-full h-full gap-8 items-center">
        <h1>Create User</h1>
        <form className=" h-full flex flex-col gap-4 w-1/2">
          <Input
            name="firstName"
            isRequired
            label="First name"
            description="Enter your first name"
            type="text"
            variant="bordered"
          />
          <Input
            name="lastName"
            isRequired
            label="Last name"
            description="Enter your last name"
            type="text"
            variant="bordered"
          />
          <Input
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
            <SubmitButton
              formAction={createUser}
              variant="flat"
              color="primary"
            >
              Submit
            </SubmitButton>
          </span>
        </form>
      </main>
    </>
  )
}
