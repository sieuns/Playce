const broadcastService = {
    // 1. 일정 등록
    createBroadcast: async (data: any) => {
      console.log('📺중계: 1. 일정 등록');
      return { id: 1 }; // 더미 ID 리턴
    },
  
    // 2. 일정 삭제
    deleteBroadcast: async (broadcastId: number) => {
      console.log(`📺중계: 2. 일정 삭제 - ID ${broadcastId}`);
    },
  
    // 3. 일정 수정
    updateBroadcast: async (broadcastId: number, data: any) => {
      console.log(`📺중계: 3. 일정 수정 - ID ${broadcastId}`);
    },
  
    // 4. 특정 식당의 일정 조회
    getBroadcastsByStore: async (storeId: number) => {
      console.log(`📺중계: 4. 특정 식당 일정 조회 - Store ID ${storeId}`);
      return [];
    }
  };
  
  export default broadcastService;
  