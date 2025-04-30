
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchIcon, FilterIcon } from "lucide-react";

interface DocumentsFilterProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  resetFilters: () => void;
}

const DocumentsFilter = ({
  searchTerm,
  setSearchTerm,
  resetFilters,
}: DocumentsFilterProps) => {
  return (
    <div className="mb-6 p-4 bg-white rounded-lg shadow-sm border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Filter by document´s name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
      
        <Button
          variant="outline"
          onClick={resetFilters}
          className="whitespace-nowrap"
        >
          Reset Filters
        </Button>
      </div>
    </div>
  );
};

export default DocumentsFilter;
