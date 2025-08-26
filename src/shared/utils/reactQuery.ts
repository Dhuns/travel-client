import { QueryClient } from "react-query";

// React Query 기본 설정 초기화
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0, // 쿼리 실패 시 재시도하지 않음
      refetchOnWindowFocus: false, // 창 포커스 시 자동 리페치 비활성화
      keepPreviousData: true, // 새 데이터를 조회하는 동안 이전 데이터 유지
    },
  },
});
