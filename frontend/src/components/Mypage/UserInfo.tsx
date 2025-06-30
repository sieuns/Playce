import { FaTimes } from "react-icons/fa";

interface UserInfoProps {
  email?: string;
  name?: string;
  nickname?: string;
  phone?: string;
  onClose?: () => void; // 닫기 콜백 추가
}

const UserInfo = ({
  email = "user@example.com",
  name = "홍길동",
  nickname = "길동이",
  phone = "010-1234-5678",
  onClose,
}: UserInfoProps) => {
  return (
    <div className="space-y-4 mt-6">
      {/* 헤더: 닫기 버튼 포함 */}
      <div className="flex items-center justify-between text-lg font-semibold my-5 px-2">
        <span className="text-lg">내 정보</span>
        {onClose && (
          <button
            onClick={onClose}
            className="hover:text-primary5"
            aria-label="닫기"
          >
            <FaTimes />
          </button>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <InfoRow label="email" value={email} />
        <InfoRow label="이름" value={name} />
        <InfoRow label="닉네임" value={nickname} />
        <InfoRow label="전화번호" value={phone} />
      </div>
    </div>
  );
};

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-center">
    <span className="px-4 w-[100px] text-gray-600 text-sm">{label}</span>
    <span>{value}</span>
  </div>
);

export default UserInfo;
