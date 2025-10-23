import { FilterPanel } from '../FilterPanel';

export default function FilterPanelExample() {
  return (
    <div className="w-full max-w-sm">
      <FilterPanel 
        onFilterChange={(filters) => console.log('Filters changed:', filters)}
      />
    </div>
  );
}
