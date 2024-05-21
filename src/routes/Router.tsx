import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/Login";
import ProtectedPages from "./ProtectedPages";
import MainPageRouts from "./MainPageRouts";

function ProxyPage() {
  const proxyIsActive = () => {
    console.log("proxyIsActive");
  };

  proxyIsActive();
  return <></>;
}

function Router({ status, userProfile }: any) {
  return (
    <div>
      {status ? (
        <BrowserRouter>
          <Routes>
            <Route
              path="*"
              element={
                <ProtectedPages status={status}>
                  <MainPageRouts userProfile={userProfile}/>
                </ProtectedPages>
              }
            ></Route>
            <Route element={<ProxyPage />} path="proxy.html" />
            <Route path="login" element={<LoginPage />}></Route>
          </Routes>
        </BrowserRouter>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default Router;
