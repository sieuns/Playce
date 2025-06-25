const broadcastService = {
  createBroadcast: async (data: any) => {
    console.log('더미 등록', data);
    return { id: 1 };  // id 포함 리턴 (필수)
  },
  deleteBroadcast: async (id: number) => {
    console.log('더미 삭제', id);
  },
  updateBroadcast: async (id: number, data: any) => {
    console.log('더미 수정', id, data);
  },
  getBroadcastsByStore: async (storeId: number) => {
    console.log('더미 조회', storeId);
    return [{ id: 1, store_id: storeId, match_date: '2025-06-25', match_time: '18:00', sport: 'soccer', league: 'K League' }];
  },
};

export default broadcastService;
