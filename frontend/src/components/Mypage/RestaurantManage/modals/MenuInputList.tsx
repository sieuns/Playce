import ErrorMessage from "./ErrorMessage";

interface MenuInputListProps {
  menus: string[];
  setMenus: (menus: string[]) => void;
  error?: string;
}

const MenuInputList = ({ menus, setMenus, error }: MenuInputListProps) => {
  const handleMenuChange = (idx: number, value: string) => {
    setMenus(menus.map((m, i) => (i === idx ? value : m)));
  };
  const addMenu = () => setMenus([...menus, ""]);
  const removeMenu = (idx: number) =>
    setMenus(menus.filter((_, i) => i !== idx));

  return (
    <div>
      <label className="block mb-1 font-semibold text-gray-700">
        메뉴 <span className="text-red-500">*</span>
      </label>
      <div className="space-y-2">
        {menus.map((menu, idx) => (
          <div key={idx} className="flex gap-2">
            <input
              className="flex-1 border rounded px-3 py-2"
              placeholder={`메뉴 ${idx + 1}`}
              value={menu}
              onChange={(e) => handleMenuChange(idx, e.target.value)}
            />
            {menus.length > 1 && (
              <button
                type="button"
                onClick={() => removeMenu(idx)}
                className="px-2 text-red-500"
              >
                삭제
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addMenu}
          className="mt-1 text-primary5 text-sm"
        >
          + 메뉴 추가
        </button>
      </div>
      <ErrorMessage message={error} />
    </div>
  );
};

export default MenuInputList;
