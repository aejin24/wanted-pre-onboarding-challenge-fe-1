import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

import "./css/index.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0, // api 요청 실패가 발생한다는 건, 서버의 문제가 있다고 판단되기 때문에 0으로 설정
      useErrorBoundary: true // 리액트 16 이상에서 제공하는 fallback ui 설정
    },
    mutations: {
      useErrorBoundary: true
    }
  }
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
