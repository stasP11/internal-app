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
  console.log(userProfile, 'userProfile')
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
          </Routes>
        </BrowserRouter>
      ) : (
        <div>Status failed</div>
      )}
    </div>
  );
}

export default Router;
