'use client'

import { removePost } from '@/lib/posts-gRPC-client'
import { Button } from '@nextui-org/react'
import { Trash } from 'lucide-react'

export default function DeletePostButton({ id }: { id: number }) {
  return (
    <>
      <Button
        isIconOnly
        color="danger"
        variant="flat"
        onPress={() => {
          removePost(id, '/posts')
        }}
      >
        <Trash size={20} />
      </Button>
    </>
  )
}
