export const regionMap: Record<string, string[]> = {
  전체: [],
  서울: ["강남구", "서초구", "마포구", "송파구"],
  경기: ["수원시", "성남시", "용인시", "하남시"],
  대전: ["중구", "유성구","서구"]
};

//하위 지역을 선택했을 때 상위 지역을 찾아서 리턴
export const getMainRegion = (sub: string): string => {
  return (
    Object.entries(regionMap).find(([, subs]) => subs.includes(sub))?.[0] || ""
  );
};