'use server'

import { CreateUserDto, User } from '@/types'
import { loadPackageDefinition, credentials } from '@grpc/grpc-js'
import { loadSync } from '@grpc/proto-loader'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import path from 'path'

const PROTO_PATH = path.resolve(process.cwd(), 'src/proto/users.proto')

// Load the .proto file
const packageDefinition = loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
})

// Access the package
const usersProto = loadPackageDefinition(packageDefinition).users

// Create the gRPC client
const client = new (usersProto as any).UsersService(
  'localhost:5000',
  credentials.createInsecure()
)

export async function fetchUsers(): Promise<User[]> {
  return new Promise((resolve, reject) => {
    client.FindAll({}, (error: any, response: any) => {
      if (error) {
        reject(error)
      } else {
        resolve(response.users)
      }
    })
  })
}

export async function fetchUser(id: number): Promise<User> {
  return new Promise((resolve, reject) => {
    client.FindOne({ id }, (error: any, response: any) => {
      if (error) {
        reject(error)
      } else {
        resolve(response)
      }
    })
  })
}

export async function createUser(formData: FormData): Promise<void> {
  const email = formData.get('email') as string
  const firstName = formData.get('firstName') as string
  const lastName = formData.get('lastName') as string

  await new Promise((resolve, reject) => {
    client.Create(
      {
        email,
        firstName,
        lastName
      },
      (error: any, response: any) => {
        if (error) {
          reject(error)
        } else {
          resolve(response.user)
        }
      }
    )
  })

  revalidatePath('/users')
  redirect('/users')
}

export async function updateUser(formData: FormData): Promise<void> {
  const id = formData.get('id') as string
  const email = formData.get('email') as string
  const firstName = formData.get('firstName') as string
  const lastName = formData.get('lastName') as string

  console.log('FormData', formData)

  console.log({ id, email, firstName, lastName })

  await new Promise((resolve, reject) => {
    client.Update(
      { id, email, firstName, lastName },
      (error: any, response: any) => {
        if (error) {
          reject(error)
        } else {
          resolve(response)
        }
      }
    )
  })

  revalidatePath(`/users/${id}`)
  redirect(`/users`)
}

export async function removeUser(id: number, path: string): Promise<void> {
  await new Promise((resolve, reject) => {
    client.Remove({ id }, (error: Error | null, response: any) => {
      if (error) {
        reject(error)
      } else {
        resolve(response)
      }
    })
  })

  revalidatePath(path)
}
