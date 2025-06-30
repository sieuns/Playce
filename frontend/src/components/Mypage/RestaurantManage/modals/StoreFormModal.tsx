import { useState } from "react";
import type { StoreFormRequest } from "../../../../types/storeFormRequest";

interface StoreFormModalProps {
  mode: "create" | "edit";
  initial?: StoreFormRequest;
  onSubmit: (data: StoreFormRequest) => void;
  onClose: () => void;
}

const StoreFormModal = ({
  mode,
  initial,
  onSubmit,
  onClose,
}: StoreFormModalProps) => {
  const [storeName, setStoreName] = useState(initial?.store_name || "");
  const [businessNumber, setBusinessNumber] = useState(
    initial?.business_number || ""
  );
  const [address, setAddress] = useState(initial?.address || "");
  const [phone, setPhone] = useState(initial?.phone || "");
  const [openingHours, setOpeningHours] = useState(
    initial?.opening_hours || ""
  );
  const [type, setType] = useState(initial?.type || "");
  const [description, setDescription] = useState(initial?.description || "");
  const [menus, setMenus] = useState<string[]>(initial?.menus || [""]);
  const [imgUrls, setImgUrls] = useState<string[]>(initial?.img_urls || [""]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // 메뉴 필드 추가/삭제
  const handleMenuChange = (idx: number, value: string) => {
    setMenus((menus) => menus.map((m, i) => (i === idx ? value : m)));
  };
  const addMenu = () => setMenus((menus) => [...menus, ""]);
  const removeMenu = (idx: number) =>
    setMenus((menus) => menus.filter((_, i) => i !== idx));

  // 이미지 URL 필드 추가/삭제
  const handleImgChange = (idx: number, value: string) => {
    setImgUrls((urls) => urls.map((u, i) => (i === idx ? value : u)));
  };
  const addImg = () => setImgUrls((urls) => [...urls, ""]);
  const removeImg = (idx: number) =>
    setImgUrls((urls) => urls.filter((_, i) => i !== idx));

  // 필수값 검증
  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!storeName.trim()) newErrors.store_name = "가게명은 필수 입력입니다.";
    if (!businessNumber.trim())
      newErrors.business_number = "사업자등록번호는 필수 입력입니다.";
    if (!address.trim()) newErrors.address = "주소는 필수 입력입니다.";
    if (!phone.trim()) newErrors.phone = "전화번호는 필수 입력입니다.";
    if (!openingHours.trim())
      newErrors.opening_hours = "영업시간은 필수 입력입니다.";
    if (!type.trim()) newErrors.type = "업종은 필수 입력입니다.";
    if (!menus.filter(Boolean).length)
      newErrors.menus = "메뉴를 1개 이상 입력하세요.";
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    onSubmit({
      store_name: storeName,
      business_number: businessNumber,
      address,
      phone,
      opening_hours: openingHours,
      menus: menus.filter(Boolean),
      type,
      description,
      img_urls: imgUrls.filter(Boolean),
    });
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-lg max-h-[90vh] overflow-y-auto p-8">
        <h3 className="text-xl font-bold mb-6">
          {mode === "edit" ? "식당 수정" : "식당 등록"}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 가게명 */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              가게명 <span className="text-red-500">*</span>
            </label>
            <input
              className="w-full border rounded px-3 py-2"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
            />
            {errors.store_name && (
              <div className="text-xs text-red-500 mt-1">
                {errors.store_name}
              </div>
            )}
          </div>
          {/* 사업자등록번호 */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              사업자등록번호 <span className="text-red-500">*</span>
            </label>
            <input
              className="w-full border rounded px-3 py-2"
              value={businessNumber}
              onChange={(e) => setBusinessNumber(e.target.value)}
            />
            {errors.business_number && (
              <div className="text-xs text-red-500 mt-1">
                {errors.business_number}
              </div>
            )}
          </div>
          {/* 주소 */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              주소 <span className="text-red-500">*</span>
            </label>
            <input
              className="w-full border rounded px-3 py-2"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            {errors.address && (
              <div className="text-xs text-red-500 mt-1">{errors.address}</div>
            )}
          </div>
          {/* 전화번호 */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              전화번호 <span className="text-red-500">*</span>
            </label>
            <input
              className="w-full border rounded px-3 py-2"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            {errors.phone && (
              <div className="text-xs text-red-500 mt-1">{errors.phone}</div>
            )}
          </div>
          {/* 영업시간 */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              영업시간 <span className="text-red-500">*</span>
            </label>
            <input
              className="w-full border rounded px-3 py-2"
              value={openingHours}
              onChange={(e) => setOpeningHours(e.target.value)}
            />
            {errors.opening_hours && (
              <div className="text-xs text-red-500 mt-1">
                {errors.opening_hours}
              </div>
            )}
          </div>
          {/* 업종 */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              업종 <span className="text-red-500">*</span>
            </label>
            <input
              className="w-full border rounded px-3 py-2"
              value={type}
              onChange={(e) => setType(e.target.value)}
            />
            {errors.type && (
              <div className="text-xs text-red-500 mt-1">{errors.type}</div>
            )}
          </div>
          {/* 메뉴 입력 (동적 필드) */}
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
                className="mt-1 text-emerald-600 text-sm"
              >
                + 메뉴 추가
              </button>
            </div>
            {errors.menus && (
              <div className="text-xs text-red-500 mt-1">{errors.menus}</div>
            )}
          </div>
          {/* 소개(선택) */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              소개
            </label>
            <textarea
              className="w-full border rounded px-3 py-2"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="식당을 소개해 주세요 (선택)"
            />
          </div>
          {/* 이미지 URL(선택, 동적 필드) */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              이미지 URL
            </label>
            <div className="space-y-2">
              {imgUrls.map((url, idx) => (
                <div key={idx} className="flex gap-2">
                  <input
                    className="flex-1 border rounded px-3 py-2"
                    placeholder={`이미지 URL ${idx + 1}`}
                    value={url}
                    onChange={(e) => handleImgChange(idx, e.target.value)}
                  />
                  {imgUrls.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeImg(idx)}
                      className="px-2 text-red-500"
                    >
                      삭제
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addImg}
                className="mt-1 text-emerald-600 text-sm"
              >
                + 이미지 추가
              </button>
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-100"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-emerald-500 text-white font-bold"
            >
              {mode === "edit" ? "수정" : "등록"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StoreFormModal;
