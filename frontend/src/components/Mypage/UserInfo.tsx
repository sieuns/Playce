interface UserInfoProps {
  email?: string;
  name?: string;
  nickname?: string;
  phone?: string;
}

const UserInfo = ({
  email = "user@example.com",
  name = "홍길동",
  nickname = "길동이",
  phone = "010-1234-5678",
}: UserInfoProps) => {
  return (
    <div className="space-y-4 mt-6">
      <h2 className="px-2 text-lg font-semibold text-gray-800">내 정보</h2>
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
