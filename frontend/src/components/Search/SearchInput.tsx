import { useSearchStore } from "../../stores/searchStore";
import InputText from "../Common/InputText";

interface SearchInputProps {
  className?: string;
}

const SearchInput = ({ className }: SearchInputProps) => {
  const { searchText, setSearchText } = useSearchStore();

  return (
    <div className={`flex gap-2 ${className || ""}`}>
      <InputText
        placeholder="식당 이름을 입력하세요."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
    </div>
  );
};

export default SearchInput;