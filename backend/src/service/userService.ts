const userService = {
    // 1. 회원가입
    join: async () => {
        console.log('👤유저 : 1. 회원가입');

        // if문 등으로 error 확인
        // const error = new Error('error');
        // (error as any).status = 409;
        // throw error;
    },
    // 2. 로그인
    login: async () => {
        console.log('👤 유저 : 2. 로그인');
    },
    // 3. 비밀번호 초기화 요청
    requestResetPassword: async () => {
        console.log('👤 유저 : 3. 비밀번호 초기화 요청');
    },
    // 4. 비밀번호 초기화
    resetPassword: async () => {
        console.log('👤 유저 : 4. 비밀번호 초기화');
    },
    // 5. 내 정보 조회
    getMyInfo: async () => {
        console.log('👤 유저 : 5. 내 정보 조회');
    },
    // 6. 닉네임 변경
    updateNickname: async () => {
        console.log('👤 유저 : 6. 닉네임 변경');
    }
};

export default userService;