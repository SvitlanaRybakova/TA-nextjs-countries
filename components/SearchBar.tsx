import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  handleSearch: (searchText: string) => void;
  handleChange: (value: string) => void;
  searchText: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  handleSearch,
  handleChange,
  searchText,
}) => {
  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input
        onChange={(event) => handleChange(event.target.value)}
        value={searchText}
        type="text"
        placeholder="Search"
      />
      <Button onClick={() => handleSearch(searchText)} type="button">
        Search
      </Button>
    </div>
  );
};

export default SearchBar;
