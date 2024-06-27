import { useContext, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import DistributorsPage from "../pages/distributors-page/DistributorsPage"
import DashboardPage from "../pages/dashboard-page/DashboardPage"
import DefaultLayout from "../layouts/default/DefaultLayout";
import ReportsListPage from "../pages/reports-list-page/ReportsListPage";
import ReportDetailsPage from "../pages/report-details-page/ReportDetailsPage";
import NotificationsPage from "../pages/notifications-page/NotificationsPage";
import SettingsPage from "../pages/settings-page/SettingsPage"
import { UserDataContext } from "../App";
import isIncludePermission from "../utils/isIncludePermission"

function MainPageRouts({ userProfile }: any) {
  const { pages, countries, roleName } = useContext(UserDataContext);

  return (
    <DefaultLayout userProfile={userProfile}>
      <Routes>
        <Route
          path="/reports-list"
          element={
            <Suspense fallback={<div>Loaded</div>}>
              {isIncludePermission(pages, "reports", "read")? (
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
          path="/reports-list/*"
          element={
            isIncludePermission(pages, "reports", "read")? (
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
              { isIncludePermission(pages, "distributors", "read")? (
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
              { isIncludePermission(pages, "dashboard", "read")? (
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
              <NotificationsPage />
            ) : (
              <span>
                Sorry you dont have access to this page, ask your admin to
                provide it
              </span>
            )
          }
        ></Route>

        <Route
          path="/settings"
          element={
            process.env.REACT_APP_API_PYTHON_API === 'loc' ? (
              <SettingsPage />
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
              <div>
                { isIncludePermission(pages, "templates", "read")? (
                  <div style={{ position: "relative" }}>
                    <img
                      src={`data:image/jpeg;base64,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`}
                      alt={"sad reality"}
                    />
                    <p>This page not ready yet, but we work on this</p>
                  </div>
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

        <Route path="*" element={<Navigate to="/reports-list" replace />} />
      </Routes>
    </DefaultLayout>
  );
}

export default MainPageRouts;
