import { Navigate, Outlet } from "react-router-dom";
import Layout from "../components/Layout";

const ProtectedRoutes = () => {
  const isAuth = true;

  return isAuth ? (
    <Layout>
      <Outlet />
    </Layout>
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoutes;
