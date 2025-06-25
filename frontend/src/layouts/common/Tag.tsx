import { getMainRegion, regionMap } from "../../data/regions";

interface TagProps {
  name: string;
  onRemove: () => void;
}

const Tag = ({ name, onRemove }: TagProps) => {
  const main = getMainRegion(name);
  const isMainRegion = Object.keys(regionMap).includes(name);
  const label = isMainRegion
    ? name
    : main && main !== "전체"
    ? `${main} ${name}`
    : name;

  return (
    <span className="px-3 py-1 text-sm bg-primary1 rounded-full flex items-center gap-1">
      {label}
      <button onClick={onRemove} className="text-gray-500 hover:text-black">
        ×
      </button>
    </span>
  );
};

export default Tag;
