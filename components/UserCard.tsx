'use client';
import React, { useEffect, useState } from 'react';
import Searchbar from './Searchbar';
type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
  company: {
    name: string;
  };
};
const UserCard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [userInfo, setUserInfo] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fetchUser = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!res.ok) throw new Error('Failed to fetch users');
      const data = await res.json();
      setUserInfo(data);
      setFilteredUsers(data);
      console.log(data);
    } catch (err) {
      setError('Could not fetch user data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);
  useEffect(() => {
    //also implemented debounce function to avoid multiple re-renders
    const delayBounce = setTimeout(() => {
      const filteredUserInfo = userInfo.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filteredUserInfo);
    }, 300);
    return () => clearTimeout(delayBounce);
  }, [searchTerm, userInfo]);
  return (
    <>
      <div className='max-w-screen-xl mx-auto px-6'>
        <Searchbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          {loading && <p>Loading...</p>}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className='bg-gray-600 shadow-2xl rounded-md p-4'
              >
                <h2 className='text-xl font-bold'>{user.name}</h2>
                <p className='text-gray-400'>Email: {user.email}</p>
                <p className='text-gray-400'>Phone: {user.phone}</p>
                <p className='text-gray-400'>Website: {user.website}</p>
                <p className='text-gray-400'>Company: {user.company.name}</p>
              </div>
            ))}
          </div>
      </div>
    </>
  );
};

export default UserCard;
