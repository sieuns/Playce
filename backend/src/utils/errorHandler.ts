export const logApiError = (apiName: string, error: any) => {
  console.log(`❌ ${apiName} - 실패 : `);
  console.log(`- 메시지 : ${error.message}`);

  if (error.stack) console.log(`- 스택 : ${error.stack}`);

  console.log(`- 전체 에러 객체 : ${error}`);
};