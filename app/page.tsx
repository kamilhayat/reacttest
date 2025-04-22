import UserCard from '@/components/UserCard';
import Image from 'next/image';

export default function Home() {
  return (
    <div>
      <h1 className='flex justify-center items-center py-10'> User Details</h1>
      <UserCard />
    </div>
  );
}
