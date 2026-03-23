import { useState, useEffect } from "react";
import { Outlet } from "react-router";
import { Header } from "./components/Header.jsx";
import { Footer } from "./components/Footer.jsx";
import Chatbot from "./components/Chatbot.jsx";
import api from "./api/axios";
export default function App() {
  const [now, setNow] = useState(null);
  const [popular, setPopular] = useState(null);
  const [topRated, setTopRated] = useState(null);
  async function loadMovie() {
    try {
      const [res1, res2, res3] = await Promise.all([
        api.get("movie/now_playing"),
        api.get("tv/popular"),
        api.get("movie/top_rated"),
      ]);
      setNow(res1.data.results.filter((m) => m.poster_path));
      setPopular(res2.data.results.filter((m) => m.poster_path));
      setTopRated(res3.data.results.filter((m) => m.poster_path));
    } catch (error) {
      console.error("영화 데이터 로드 실패:", error);
      // 에러 발생 시에도 빈 배열로 설정
      setNow([]);
      setPopular([]);
      setTopRated([]);
    }
  }

  useEffect(() => {
    loadMovie();
  }, []);
  const loading = now === null || popular === null || topRated === null;
  const ctx = {
    //ctx.now, ctx.popular, ctx.topRated
    now: now || [],
    popular: popular || [],
    topRated: topRated || [],
    loading,
  };
  return (
    <>
      <Header />
      <Outlet context={ctx} />
      <Footer />
      <Chatbot />
    </>
  );
}
