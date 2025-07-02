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
    <span className="px-3 py-1 text-sm bg-primary3 text-primary5 rounded-full flex items-center gap-1">
      {label}
      <button onClick={onRemove} className="hover:text-primary5">
        ×
      </button>
    </span>
  );
};

export default Tag;
