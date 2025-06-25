const storeServcie = {
  // 1. 식당 등록
  registerStore: async () => {
    console.log("식당 등록");
    const error = new Error("필수 입력값이 누락되었습니다.");
    (error as any).status = 400;
    throw error;
  },
  // 2. 식당 수정
  updateStore: async () => {
    console.log("식당 수정");
    const error = new Error("해당 식당을 찾을 수 없습니다.");
    (error as any).status = 404;
    throw error;
  },
  // 3. 식당 삭제
  deleteStore: async () => {
    console.log("식당 삭제");
    const error = new Error("삭제 권한이 없습니다.");
    (error as any).status = 403;
    throw error;
  },
  // 4. 식당 상세 조회
  getStoreDetail: async () => {
    console.log("식당 상세 조회");
    const error = new Error("해당 식당이 존재하지 않습니다.");
    (error as any).status = 404;
    throw error;
  },
  // 5. 내 식당 목록
  getMyStores: async () => {
    console.log("내가 등록한 식당 목록");
    const error = new Error("인증 정보가 없습니다.");
    (error as any).status = 401;
    throw error;
  },
};

export default storeServcie;
