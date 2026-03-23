import { useState, useEffect } from "react";
import { useParams } from "react-router";
import Card from "./Card.jsx";
import api from "../api/axios";
import { Spinner, Container, Button } from "./UI.jsx";
const TITLES = {
  now_playing: "현재 상영작",
  popular: "인기 영화",
  top_rated: "최고 평점",
};
export function Category() {
  const { type } = useParams();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [data, setData] = useState({ type: "", page: 0, movies: [] });
  // 변수 추가를 해야 더보기 버튼을 눌렀을 때 페이지가 바뀌면서 새로운 데이터를 불러올 수 있음
  const title = TITLES[type] || "영화";
  useEffect(() => {
    api
      .get(`movie/${type}`, { params: { page: page } })
      .then((res) => {
        let pages = res.data.total_pages;
        if (pages > 20) {
          pages = 20;
        }
        setTotalPages(pages);
        setData({
          type: type,
          page: page,
          movies: res.data.results.filter((m) => m.poster_path),
        });
      })
      .catch(() => {
        setData({ type: type, page: page, movies: [] });
      });
  }, [type, page]);

  const loading = data.type !== type || data.page !== page;
  function goPrev() {
    if (page > 1) {
      setPage(page - 1);
    }
  }

  function goNext() {
    if (page < totalPages) {
      setPage(page + 1);
    }
  }
  return (
    <Container className="min-h-screen pt-28 pb-16">
      <h2 className="text-3xl font-bold text-white mb-8">{title}</h2>

      {loading && <Spinner />}

      {!loading && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {data.movies.map((el) => (
              <Card key={el.id} item={el} />
            ))}
          </div>
          {/* 페이지네이션 버튼 */}
          <div className="flex justify-center items-center gap-4 mt-12">
            <Button
              variant="primary"
              onClick={goPrev}
              disabled={page === 1}
              className="px-4 py-2 rounded"
            >
              이전
            </Button>
            <span className="text-white">
              {page} / {totalPages}
            </span>
            <Button
              variant="primary"
              onClick={goNext}
              disabled={page === totalPages}
              className="px-4 py-2 rounded"
            >
              다음
            </Button>
          </div>
        </>
      )}
    </Container>
  );
}
