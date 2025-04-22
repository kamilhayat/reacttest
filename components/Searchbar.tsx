'use client';
type searchBarProps={
    searchTerm:string;
    setSearchTerm: (value: string) => void;
}
const Searchbar:React.FC<searchBarProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className='flex justify-center items-center py-4'>
      <input
        type='text'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className='border border-gray-300 rounded-md p-2 w-1/2'
        placeholder='Search for users...'
      />
    </div>
  );
};

export default Searchbar;
