'use client';

import { useEffect, useState } from 'react';

export default function Profile() {
  const [name, setName] = useState<string>(''); // Default to empty string

  useEffect(() => {
    const userId = localStorage.getItem('name');
    if (!userId) return;

    // Fetch user info
    fetch(`/api/user?name=${userId}`)
      .then((res) => res.json())
      .then((data) => setName(data.name))
      .catch((err) => console.error('Error fetching user:', err));
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center mt-10">
      <div>
        <h1 className="text-[2.5rem] text-center">Profile</h1>
      </div>
      <div className="mt-4 text-lg">
        {name ? `Welcome, ${name}!` : 'Loading user info...'}
      </div>
    </div>
  );
}
