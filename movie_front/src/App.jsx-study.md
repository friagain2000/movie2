# `src/App.jsx` 코드 분석 및 설명

이 문서는 `src/App.jsx` 파일의 코드를 각 부분별로 나누어 상세히 설명합니다.

## 1. 모듈 및 컴포넌트 임포트
```javascript
import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import api from "./api/axios.js";
import Header from "./components/Header.jsx";
```
- `useEffect`, `useState`: React에서 제공하는 핵심 Hook입니다. 컴포넌트의 상태를 관리하고 화면 렌더링 및 데이터 로딩 같은 부수 효과(side effects)를 처리합니다.
- `Outlet`: React Router에서 중첩 라우팅을 사용할 때 하위 페이지(라우트 컴포넌트)가 렌더링될 위치를 지정하는 역할을 합니다.
- `api`: `./api/axios.js`에서 미리 설정해둔 axios 인스턴스를 가져옵니다. 이 객체를 통해 서버(TMDB 영화 API 등)로 HTTP 요청을 보냅니다.
- `Header`: 애플리케이션의 상단 메뉴나 로고 등을 표시하는 헤더 컴포넌트를 불러옵니다.

## 2. 테스트용 콘솔 출력 및 주석
```javascript
console.log("api:", api);
// useEffect: 컴포넌트 내의 함수 실행 시점 제어
// useState: 컴포넌트 내의 데이터(상태관리) 변경 시 컴포넌트 re-road

// API 요청을 보내는 함수
// async/await (set) 문법을 사용하여 비동기적으로 API 요청을 처리
```
- `console.log("api:", api);`: 불러온 `api` 객체가 정상적으로 연결되었는지 브라우저 개발자 도구의 콘솔에서 확인하기 위한 코드입니다.
- 주석들: 코드의 이해를 돕기 위해 `useEffect`, `useState`, `async/await`에 대한 간단한 개념 설명이 적혀 있습니다.

## 3. App 컴포넌트 선언 및 상태 초기화
```javascript
export default function App() {
  const [now, setNow] = useState([]); // now 상태 변수 초기화
```
- `App`: 애플리케이션의 기본 뼈대가 되는 메인 컴포넌트입니다.
- `useState([])`: 영화 데이터를 담을 `now`라는 상태 변수를 생성합니다. 초기값으로 빈 배열(`[]`)을 설정했습니다. `setNow`는 이 `now`의 값을 업데이트할 때 사용하는 함수이며, 상태가 업데이트되면 컴포넌트가 다시 렌더링되어 화면이 바뀝니다.

## 4. API 데이터 호출 (비동기 함수 선언)
```javascript
  async function loadMovie() {
    const res1 = await api.get(`now_playing`); // 예약 된 요청
    const data = res1.data.results;
    setNow(data);
  }
```
- `loadMovie`: 외부 API 서버에서 영화 데이터를 가져오기 위한 비동기(async) 함수입니다.
- `await api.get('now_playing')`: axios를 이용해 'now_playing'(현재 상영작) 엔드포인트로 GET 요청을 보냅니다. `await` 키워드를 써서 데이터 응답이 올 때까지 기다립니다.
- `setNow(data)`: 응답받은 결과(`res1`) 중에서 실제 영화 목록 배열(`res1.data.results`)을 뽑아 `setNow` 함수를 통해 `now` 상태 변수에 저장합니다.

## 5. 컴포넌트 마운트 시 API 호출 실행
```javascript
  useEffect(() => {
    loadMovie();
  }, []); // 컴포넌트가 처음 렌더링 될 때 loadMovie 함수 실행(딱 한 번 실행 됨)
```
- `useEffect`: 첫 번째 인자로 실행할 콜백 함수를, 두 번째 인자로 의존성 배열(dependency array)을 받습니다.
- `[]` (빈 배열): 배열이 비어있으므로, 이 안에 있는 `loadMovie()` 코드는 이 컴포넌트가 브라우저 화면에 처음 나타날 때(Mount) **단 한 번만 실행**됩니다. 무한 렌더링 루프를 방지하는 역할을 합니다.

## 6. 화면 렌더링 (JSX 반환)
```javascript
  return (
    <>
      <Header />
      {console.log("컴포넌트에서", now)}
      {/* {now.map(() => {return})} */}
      {now.map((el) => (
        <div key={el.id} className="py-10">
          <img 
            src={`https://image.tmdb.org/t/p/w500${el.poster_path}`} 
            alt={el.title} 
            style={{ width: "200px", borderRadius: "8px" }}
          />
          <h3>{el.title}</h3>
        </div>
      ))}
      <Outlet />
    </>
  );
}
```
- `<> ... </>` (Fragment): 불필요한 HTML `div` 태그를 생성하지 않고 여러 자식 요소를 하나로 묶어줍니다.
- `<Header />`: 임포트한 헤더 컴포넌트를 화면 맨 위에 표시합니다.
- `{now.map(...)}`: `now` 배열에 저장된 여러 영화 데이터(객체 `el`)를 하나씩 꺼내어 반복적으로 화면(HTML 요소)으로 만들어냅니다.
  - `key={el.id}`: React가 반복되는 요소들을 효율적으로 식별하고 관리하기 위해 반드시 부여해야 하는 고유한 키값입니다.
  - `<img ... />`: TMDB 이미지 서버 주소와 각 영화의 포스터 경로(`el.poster_path`)를 합쳐 영화 포스터 이미지를 화면에 띄웁니다. 너비 200px과 모서리를 둥글게(8px) 만드는 스타일이 인라인으로 적용되어 있습니다.
  - `<h3>{el.title}</h3>`: 각 영화의 제목을 출력합니다.
- `<Outlet />`: 자식 라우트(예: 메인 화면 외에 상세 페이지 등) 컴포넌트의 내용이 화면의 이 위치에 표시되도록 만듭니다.