'use server'

import { Post } from '@/types'
import { loadPackageDefinition, credentials } from '@grpc/grpc-js'
import { loadSync } from '@grpc/proto-loader'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import path from 'path'

const PROTO_PATH = path.resolve(process.cwd(), 'src/proto/posts.proto')

// Load the .proto file
const packageDefinition = loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
})

// Access the package
const postsProto = loadPackageDefinition(packageDefinition).posts

// Create the gRPC client
const client = new (postsProto as any).PostsService(
  'localhost:5000',
  credentials.createInsecure()
)

export async function fetchPosts(): Promise<Post[]> {
  return new Promise((resolve, reject) => {
    client.FindAll({}, (error: any, response: any) => {
      if (error) {
        reject(error)
      } else {
        resolve(response.posts)
      }
    })
  })
}

export async function fetchPost(id: number): Promise<Post> {
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

export async function createPost(formData: FormData): Promise<void> {
  const title = formData.get('title') as string
  const content = formData.get('content') as string
  const authorId = parseInt(formData.get('authorId') as string, 10)

  await new Promise((resolve, reject) => {
    client.Create({ title, content, authorId }, (error: any, response: any) => {
      if (error) {
        reject(error)
      } else {
        resolve(response.post)
      }
    })
  })

  revalidatePath('/posts')
  redirect('/posts')
}

export async function updatePost(formData: FormData): Promise<void> {
  const id = parseInt(formData.get('id') as string, 10)
  const title = formData.get('title') as string
  const content = formData.get('content') as string

  await new Promise((resolve, reject) => {
    client.Update({ id, title, content }, (error: any, response: any) => {
      if (error) {
        reject(error)
      } else {
        resolve(response)
      }
    })
  })

  revalidatePath(`/posts/${id}`)
  redirect(`/posts`)
}

export async function removePost(id: number, path: string): Promise<void> {
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
