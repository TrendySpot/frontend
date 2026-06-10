import { Routes, Route } from "react-router-dom";
import Layout from "../components/layout/Layout";
import ProtectedRoute from "../components/common/ProtectedRoute";

import MainPage from "../pages/MainPage";
import SearchPage from "../pages/SearchPage";
import DetailPage from "../pages/DetailPage";
import MyPage from "../pages/MyPage";
import LoginPage from "../pages/auth/LoginPage";
import SignUpPage from "../pages/auth/SignUpPage";
import AdminDashboardPage from "../pages/admin/AdminDashboardPage";
import AdminMemberPage from "../pages/admin/AdminMemberPage";
import AdminSpotPage from "../pages/admin/AdminSpotPage";
import AdminReviewPage from "../pages/admin/AdminReviewPage";
import NotFoundPage from "../pages/NotFoundPage";
import OAuth2CallbackPage from "../pages/auth/OAuth2CallbackPage";

const Router = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<MainPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/spots/:spotId" element={<DetailPage />} />
        <Route
          path="/mypage"
          element={
            <ProtectedRoute>
              <MyPage />
            </ProtectedRoute>
          }
        />
      </Route>

      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/oauth2/callback" element={<OAuth2CallbackPage />} />

      <Route
        path="/admin"
        element={
          <ProtectedRoute adminOnly>
            <AdminDashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/members"
        element={
          <ProtectedRoute adminOnly>
            <AdminMemberPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/spots"
        element={
          <ProtectedRoute adminOnly>
            <AdminSpotPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/reviews"
        element={
          <ProtectedRoute adminOnly>
            <AdminReviewPage />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default Router;
