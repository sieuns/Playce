const favoriteService = {
    // 1. 즐겨찾기 추가
    addFavorite: async (userId: number, storeId: number) => {
      console.log(`⭐즐겨찾기: 1. 추가 - User ${userId}, Store ${storeId}`);
      return { id: 1 }; // 더미 ID 리턴
    },
  
    // 2. 즐겨찾기 삭제
    removeFavorite: async (userId: number, storeId: number) => {
      console.log(`⭐즐겨찾기: 2. 삭제 - User ${userId}, Store ${storeId}`);
    },
  
    // 3. 즐겨찾기 목록 조회
    getFavorites: async (userId: number) => {
      console.log(`⭐즐겨찾기: 3. 목록 조회 - User ${userId}`);
      return [];
    }
  };
  
  export default favoriteService;
  