'use server'

import { Post } from '@/types'
import { loadPackageDefinition, credentials } from '@grpc/grpc-js'
import { loadSync } from '@grpc/proto-loader'
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

async function fetchPosts(): Promise<Post[]> {
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

export { fetchPosts }
