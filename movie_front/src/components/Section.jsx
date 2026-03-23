import { Link } from "react-router";
import Card from "./Card.jsx";
import { Container } from "./UI.jsx";

export default function Section({ title, items = [], category }) {
  return (
    <section className="bg-black px-6 md:px-11 py-24">
      <Container>
        {/* 타이틀과 더보기 버튼을 감싸는 div */}
        <div className="flex items-end justify-between pb-10 px-3">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            {title}
          </h2>
          {category && (
            <Link 
              to={`/category/${category}`} 
              className="text-yellow-400 hover:text-yellow-300 transition-colors"
            >
              더보기 +
            </Link>
          )}
        </div>

        {/* 영화 카드 그리드 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {items?.map((el) => (
            <Card key={el.id} item={el} />
          ))}
        </div>
      </Container>
    </section>
  );
}