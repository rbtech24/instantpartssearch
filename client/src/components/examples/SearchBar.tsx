import { SearchBar } from '../SearchBar';

export default function SearchBarExample() {
  return (
    <div className="w-full max-w-2xl">
      <SearchBar 
        onSearch={(query) => console.log('Search query:', query)}
        placeholder="Search for appliance parts..."
      />
    </div>
  );
}
