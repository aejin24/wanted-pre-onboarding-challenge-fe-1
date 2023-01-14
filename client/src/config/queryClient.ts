import { QueryClient } from "react-query";

export default new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0, // api 요청 실패가 발생한다는 건, 서버의 문제가 있다고 판단되기 때문에 0으로 설정
      staleTime: 5 * 60 * 1000,
    },
  },
});
