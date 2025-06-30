interface ImageUrlInputListProps {
  imgUrls: string[];
  setImgUrls: (urls: string[]) => void;
}

const ImageUrlInputList = ({ imgUrls, setImgUrls }: ImageUrlInputListProps) => {
  const handleImgChange = (idx: number, value: string) => {
    setImgUrls(imgUrls.map((u, i) => (i === idx ? value : u)));
  };
  const addImg = () => setImgUrls([...imgUrls, ""]);
  const removeImg = (idx: number) =>
    setImgUrls(imgUrls.filter((_, i) => i !== idx));

  return (
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
  );
};

export default ImageUrlInputList;
