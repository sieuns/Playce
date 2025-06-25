import { useSearchStore } from "../../stores/searchStore";

interface SearchInputProps {
  className?: string;
}

const SearchInput = ({ className }: SearchInputProps) => {
  const { searchText, setSearchText } = useSearchStore();

  return (
    <div className={`flex gap-2 ${className || ""}`}>
      <input
        type="text"
        placeholder="식당 이름을 입력하세요."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="border px-4 py-2 rounded w-full hover:border-primary1 focus:border-primary1 focus:outline-none focus:ring-primary1"
      />
    </div>
  );
};

export default SearchInput;
