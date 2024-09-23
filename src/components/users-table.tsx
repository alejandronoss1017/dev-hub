'use client'

import { Key, useMemo, useCallback } from 'react'
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  User,
  Link,
  Chip,
  Tooltip
} from '@nextui-org/react'
import { useRouter } from 'next/navigation'

import { type User as UserType } from '@/types'
import { Pencil, Plus, Send, Trash } from 'lucide-react'
import { removeUser } from '@/lib/users-gRPC-client'

type ColumnKey = 'name' | 'posts' | 'actions' | 'id'

interface Column {
  uid: ColumnKey
  name: string
  sortable?: boolean
}

const columns: Column[] = [
  { name: 'ID', uid: 'id' },
  { name: 'NAME', uid: 'name' },
  { name: 'POSTS', uid: 'posts' },
  { name: 'ACTIONS', uid: 'actions' }
]

interface UsersTableProps {
  users: UserType[]
}

export default function UsersTable({ users }: UsersTableProps) {
  const router = useRouter()

  const renderCell = useCallback((user: UserType, columnKey: Key) => {
    switch (columnKey as ColumnKey) {
      case 'id':
        return <span className="font-bold">{user.id}</span>
      case 'name':
        return (
          <User
            avatarProps={{
              showFallback: true,
              name: `${user.firstName} ${user.lastName}`
            }}
            description={user.email}
            name={`${user.firstName} ${user.lastName}`}
          ></User>
        )
      case 'posts':
        return (
          <Chip
            color="primary"
            variant="flat"
            startContent={<Send size={20} />}
          >
            {user.posts.length}
          </Chip>
        )
      case 'actions':
        return (
          <div className="relative flex items-center justify-center gap-4">
            <Tooltip color="primary" content="Edit user">
              <Button
                variant="flat"
                color="primary"
                isIconOnly
                onPress={() => {
                  router.push(`/users/${user.id}`)
                }}
              >
                <Pencil size={20} />
              </Button>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <Button
                variant="flat"
                color="danger"
                isIconOnly
                onPress={() => {
                  removeUser(user.id, '/users')
                }}
              >
                <Trash size={20} />
              </Button>
            </Tooltip>
          </div>
        )
      default:
        return <></>
    }
  }, [router])

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-end gap-3 items-end overflow-auto">
          <div className="flex gap-3">
            <Button
              as={Link}
              color="primary"
              href="/users/create"
              endContent={<Plus size={20} />}
            >
              Añadir
            </Button>
          </div>
        </div>
      </div>
    )
  }, [])

  return (
    <Table
      aria-label="Example table with custom cells, pagination and sorting"
      isHeaderSticky
      selectionMode="single"
      selectionBehavior="replace"
      classNames={{
        wrapper: 'max-h-[382px]'
      }}
      topContent={topContent}
      topContentPlacement="outside"
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === 'actions' ? 'center' : 'start'}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={'No se encontraron usuarios'} items={users}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => {
              return <TableCell>{renderCell(item, columnKey)}</TableCell>
            }}
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
