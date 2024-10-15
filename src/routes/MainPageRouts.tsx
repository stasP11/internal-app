import { UserDataContext } from "../App";
import isIncludePermission from "../utils/isIncludePermission";
import { useContext, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import DistributorsPage from "../pages/distributors-page/DistributorsPage";
import DashboardPage from "../pages/dashboard-page/DashboardPage";
import DefaultLayout from "../layouts/default/DefaultLayout";
import ReportsListPage from "../pages/reports-page/ReportsListPage";
import ReportDetailsPage from "../pages/report-details-page/ReportDetailsPage";
import TimelinesPage from "../pages/timelines-page/TimelinesPage";
import TemplatesPage from "../pages/templates-page/TemplatesPage"
import ProductsPage from "pages/products-page/ProductsPage";
import DataStewardsPage from "pages/data-stewards-page/DataStewardsPage";
import OnboardingPage from "pages/onboarding-page/OnboardingPage";

function MainPageRouts({ userProfile }: any) {
  const { pages } = useContext(UserDataContext);

  return (
    <DefaultLayout userProfile={userProfile}>
      <Routes>
        <Route
          path="/reports"
          element={
            <Suspense fallback={<div>Loaded</div>}>
              {true ? (
                <ReportsListPage />
              ) : (
                <span>
                  Sorry you dont have access to this page, ask your admin to
                  provide it
                </span>
              )}
            </Suspense>
          }
        />

        <Route
          path="/report/*"
          element={
            true ? (
              <ReportDetailsPage />
            ) : (
              <span>
                Sorry you dont have access to this page, ask your admin to
                provide it
              </span>
            )
          }
        />

        <Route
          path="/distributors"
          element={
            <Suspense fallback={<div>Loaded</div>}>
              {isIncludePermission(pages, "distributors", "read") ? (
                <DistributorsPage />
              ) : (
                <span>
                  Sorry you dont have access to this page, ask your admin to
                  provide it
                </span>
              )}
            </Suspense>
          }
        ></Route>

        <Route
          path="/dashboard"
          element={
            <Suspense fallback={<div>Loaded</div>}>
              {isIncludePermission(pages, "dashboard", "read") ? (
                <DashboardPage />
              ) : (
                <span>
                  Sorry you dont have access to this page, ask your admin to
                  provide it
                </span>
              )}
            </Suspense>
          }
        ></Route>

        <Route
          path="/timelines"
          element={
            isIncludePermission(pages, "timelines", "read") ? (
              <TimelinesPage />
            ) : (
              <span>
                Sorry you dont have access to this page, ask your admin to
                provide it
              </span>
            )
          }
        ></Route>

        <Route
          path="/templates"
          element={
            <Suspense fallback={<div>Loaded</div>}>
              <>
                {isIncludePermission(pages, "templates", "read") ? (
                   <TemplatesPage/>
                ) : (
                  <span>
                    Sorry you dont have access to this page, ask your admin to
                    provide it
                  </span>
                )}
              </>
            </Suspense>
          }
        ></Route>

        <Route
          path="/products"
          element={
            <Suspense fallback={<div>Loaded</div>}>
              <>
                {isIncludePermission(pages, "products", "read") ? (
                  <ProductsPage />
                ) : (
                  <span>
                    Sorry you dont have access to this page, ask your admin to
                    provide it
                  </span>
                )}
              </>
            </Suspense>
          }
        ></Route>

        <Route
          path="/stewards"
          element={
            <Suspense fallback={<div>Loaded</div>}>
              <>
                {isIncludePermission(pages, "stewards", "read") ? (
                  <DataStewardsPage />
                ) : (
                  <span>
                    Sorry you dont have access to this page, ask your admin to
                    provide it
                  </span>
                )}
              </>
            </Suspense>
          }
        ></Route>

        <Route
          path="/onboarding"
          element={
            <Suspense fallback={<div>Loaded</div>}>
              <div style={{ height: "100%" }}>
                {isIncludePermission(pages, "onboardingHide", "read") ? (
                  <OnboardingPage />
                ) : (
                  <span>
                    Sorry you dont have access to this page, ask your admin to
                    provide it
                  </span>
                )}
              </div>
            </Suspense>
          }
        ></Route>

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </DefaultLayout>
  );
}

export default MainPageRouts;
