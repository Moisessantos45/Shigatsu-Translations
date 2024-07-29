import { Navigate, Outlet } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { Suspense } from "react";
import LatestPosts from "../Components/Section/LatestPosts";

const LayoutHome = () => {
  const isMaintenanceMode = false;
  return (
    <>
      {isMaintenanceMode ? (
        <Navigate to="/mantenimiento" replace={true} />
      ) : (
        <>
          <Header />
          <Suspense fallback={<div>Loading...</div>}>
            <Outlet />
          </Suspense>
          <LatestPosts />
          <Footer />
        </>
      )}
    </>
  );
};

export default LayoutHome;
