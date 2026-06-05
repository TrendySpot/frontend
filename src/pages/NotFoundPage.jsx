import { Link } from "react-router-dom";
import "./NotFoundPage.css";

const NotFoundPage = () => {
  return (
    <div className="not-found">
      <h1>404</h1>
      <p>페이지를 찾을 수 없습니다.</p>
      <Link to="/">메인으로 돌아가기</Link>
    </div>
  );
};

export default NotFoundPage;