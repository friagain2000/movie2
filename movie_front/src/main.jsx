import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
//라우팅할 컴포넌트 임포트
import App from "./App.jsx";
import { Home } from "./components/Home.jsx";
import { MovieDetail } from "./components/MovieDetail.jsx";
import { ErrorPage } from "./components/ErrorPage.jsx";
import { Category } from "./components/Category.jsx";

// 리액트는 컴포넌트간의 연결을 하기위한 라우터 설정과정이 필요함
// 라우터를 하는 그 자체를 라우팅=>라우팅 설정을 하기위한 모듈 설치
import { createBrowserRouter, RouterProvider } from "react-router";

// 경로설정
const router = createBrowserRouter([
  // App 전체 레이아웃역할, Home 메인화면
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,

        element: <Home />,
      },

      {
        path: "movie/:id",
        element: <MovieDetail />,
      },
      { path: "category/:type", element: <Category /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
