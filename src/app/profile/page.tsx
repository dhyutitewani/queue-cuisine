'use client';

import { useEffect, useState } from 'react';

export default function Profile() {
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    const storedName = localStorage.getItem('name');
    const userId = localStorage.getItem('email');
    setName(storedName);
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center mt-10">
      <div>
        <h1 className="text-[2.5rem] text-center">Profile</h1>
        {name && <h2 className="text-xl text-center mt-4">Welcome, {name}</h2>}
      </div>
    </div>
  );
}
