export interface CreateUserDto {
  email: string
  firstName: string
  lastName: string
}

export interface UpdateUserDto {
  id: number
  email: string
  firstName: string
  lastName: string
}

export interface UserById {
  id: number
}

export interface User {
  id: number
  email: string
  firstName: string
  lastName: string
  posts: Post[]
}

export interface Users {
  users: User[]
}

export interface CreatePostDto {
  title: string
  content: string
  authorId: number
}

export interface PostById {
  id: number
}

export interface Post {
  id: number
  title: string
  content: string
  authorId: number
}

export interface Posts {
  posts: Post[]
}

export interface UpdatePostDto {
  id: number
  title: string
  content: string
}
