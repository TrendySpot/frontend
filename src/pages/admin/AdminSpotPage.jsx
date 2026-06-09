import { useState } from "react";
import AxiosApi from "../../api/AxiosApi";
import "./AdminSpotPage.css";

const AdminSpotPage = () => {
  const [form, setForm] = useState({
    title: "",
    spotType: "POPUP",
    area: "",
    address: "",
    startDate: "",
    endDate: "",
    price: 0,
    imageUrl: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await AxiosApi.createAdminSpot(form);
      alert("스팟이 등록되었습니다.");

      setForm({
        title: "",
        spotType: "POPUP",
        area: "",
        address: "",
        startDate: "",
        endDate: "",
        price: 0,
        imageUrl: "",
        description: "",
      });
    } catch (e) {
      console.error("스팟 등록 실패", e);
      alert("스팟 등록에 실패했습니다.");
    }
  };

  return (
    <main className="admin-spot-page">
      <div className="admin-spot-header">
        <p>Trendy Spot Admin</p>
        <h1>스팟 관리</h1>
      </div>

      <section className="admin-spot-panel">
        <h2>스팟 등록</h2>

        <form className="admin-spot-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label>스팟명</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="스팟명을 입력하세요"
              required
            />
          </div>

          <div className="form-row">
            <label>카테고리</label>
            <select name="spotType" value={form.spotType} onChange={handleChange}>
              <option value="POPUP">팝업스토어</option>
              <option value="EXHIBIT">전시회</option>
            </select>
          </div>

          <div className="form-row">
            <label>지역</label>
            <input
              name="area"
              value={form.area}
              onChange={handleChange}
              placeholder="예: 서울"
              required
            />
          </div>

          <div className="form-row">
            <label>주소</label>
            <input
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="상세 주소"
              required
            />
          </div>

          <div className="form-row">
            <label>시작일</label>
            <input
              type="date"
              name="startDate"
              value={form.startDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <label>종료일</label>
            <input
              type="date"
              name="endDate"
              value={form.endDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <label>가격</label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              min="0"
            />
          </div>

          <div className="form-row full">
            <label>이미지 URL</label>
            <input
              name="imageUrl"
              value={form.imageUrl}
              onChange={handleChange}
              placeholder="대표 이미지 URL"
            />
          </div>

          <div className="form-row full">
            <label>설명</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="스팟 설명을 입력하세요"
              rows="5"
            />
          </div>

          <div className="form-actions">
            <button type="submit">스팟 등록</button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default AdminSpotPage;