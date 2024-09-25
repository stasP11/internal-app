import { BrowserRouter, Routes, Route } from "react-router-dom";
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
    <>
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
          </Routes>
        </BrowserRouter>
      ) : (
        <div></div>
      )}
    </>
  );
}

export default Router;
