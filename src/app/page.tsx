"use client";

import { useState, useEffect } from 'react';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { User } from '@/app/api/users/interfaces/user.interface';

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch('/api/users')
      .then((res) => res.json())
      .then((data) => setUsers(data.users))
      .catch((err) => console.error('Error fetching users:', err));
  }, []);

  return (
    <main className="flex min-h-full flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold">Hello World!</h1>

      <div className="flex gap-4 justify-center">
        <ThemeSwitcher variant="flat" />
      </div>

      <div>
        <h1>Users</h1>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <p>{user.email} {user.firstName} {user.lastName}</p>
              <ul>
                {user.posts.map((post) => (
                  <li key={post.id}>
                    <p><strong>Title:</strong> {post.title}</p>
                    <p><strong>Content:</strong> {post.content}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}