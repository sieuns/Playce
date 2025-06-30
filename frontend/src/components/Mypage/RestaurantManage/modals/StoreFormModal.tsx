// StoreFormModal.tsx
import { useState } from "react";
import type { MyStore } from "../../../../types/MyStore";

interface StoreFormModalProps {
  mode: "create" | "edit";
  initial?: MyStore | null;
  onSubmit: (data: MyStore) => void;
  onClose: () => void;
}

const StoreFormModal = ({
  mode,
  initial,
  onSubmit,
  onClose,
}: StoreFormModalProps) => {
  const [name, setName] = useState(initial?.store_name || "");
  const [address, setAddress] = useState(initial?.address || "");
  const [mainImg, setMainImg] = useState(initial?.main_img || "");

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <h3 className="text-xl font-bold mb-6">
          {mode === "edit" ? "식당 수정" : "식당 등록"}
        </h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit({
              store_id: initial?.store_id || 0,
              store_name: name,
              address,
              main_img: mainImg,
            });
          }}
          className="space-y-4"
        >
          <input
            className="w-full border rounded px-3 py-2"
            placeholder="식당 이름"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            className="w-full border rounded px-3 py-2"
            placeholder="주소"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          <input
            className="w-full border rounded px-3 py-2"
            placeholder="대표 이미지 URL"
            value={mainImg}
            onChange={(e) => setMainImg(e.target.value)}
          />
          <div className="flex justify-end gap-2">
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
